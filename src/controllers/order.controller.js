import { getOrderRepo, getOrderedItemRepo, getCartItemRepo} from "../db/repo.js";

export const checkout = async (req, res) => {
    try {
        const userId = req.userId;
        const { address, phone } = req.body;

        const cartItemRepo = getCartItemRepo();
        const orderRepo = getOrderRepo();
        const orderedItemRepo = getOrderedItemRepo();
        //get cart items added by the currently authorized user to their cart
        const cartItems = await cartItemRepo.find({
            where: {
                cart: {
                    user: { id: userId }
                }
            },
        });

        if (!cartItems.length) {
            return res.status(400).json({ msg: "Cart is empty" });
        }
        //total amount by reduction
        const totalAmount = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.product.price); 
            return sum + (price * item.quantity);
        }, 0);

        let order = orderRepo.create({
            address,
            phone, 
            total_amount: totalAmount,
            user: { id: userId }
        });
        order = await orderRepo.save(order);

        const orderedItems = await Promise.all(
            cartItems.map(async (cartItem) => {
                const orderedItem = orderedItemRepo.create({
                    price: cartItem.product.price,
                    quantity: cartItem.quantity,
                    order: { id: order.id },
                    product: { id: cartItem.product.id },
                    cartItem: { id: cartItem.id } 
                });

                return await orderedItemRepo.save(orderedItem);
            })
        );

        const cartItemsToDelete = await cartItemRepo.find({
            where: { cart: { user: { id: userId } } },
            select: ['id']
        });
        await cartItemRepo.delete(cartItemsToDelete.map(item => item.id));

        res.status(201).json({ msg: "Order created successfully", order, orderedItems });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error checking out", error: err.message });
    }
};

