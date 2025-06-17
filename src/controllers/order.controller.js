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

        console.log("aASJKAJSKA: ",cartItems)
        //total amount by reduction
        const totalAmount = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.product.price); 
            return sum + (price * item.quantity);
        }, 0);

        let order = orderRepo.create({
            address,
            phone, 
            total_amount: totalAmount,
            user: { id: userId },
        });

        order = await orderRepo.save(order);

        const orderedItems = await Promise.all(
        cartItems.map(async (cartItem) => {
            try {
                const orderedItem = orderedItemRepo.create({
                price: cartItem.product.price,
                quantity: cartItem.quantity,
                order: { id: order.id },
                product: { id: cartItem.product.id },
                cartItem: { id: cartItem.id },
            });

            const saved = await orderedItemRepo.save(orderedItem);
            saved.product.name = cartItem.product.name;
            console.log(saved);
            return saved;
            } catch (err) {
            console.error("Failed to save orderedItem for:", cartItem.product.name, err);
            return null;
            }
        })
        );
        
        const successfulItems = orderedItems.filter((item) => item !== null);
        console.log("SASASA:", successfulItems);

        const cartItemsToDelete = await cartItemRepo.find({
            where: { cart: { user: { id: userId } } },
            select: ['id']
        });
        if (!cartItemsToDelete.length) {
            console.warn("No cart items found to delete for user:", userId);
        } else {
            const ids = cartItemsToDelete.map(item => item.id);
            console.log("Deleting cart items with IDs:", ids);
            await cartItemRepo.delete(ids);
        }

        res.status(201).json({ msg: "Order created successfully", order, orderedItems:successfulItems });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error checking out", error: err.message });
    }
};

