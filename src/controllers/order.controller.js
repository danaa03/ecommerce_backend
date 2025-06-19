import { getOrderRepo, getCartItemRepo} from "../db/repo.js";
import { findById, deleteCartItems } from "./cartItem.controller.js";
import { mapCartItemsToOrderItems } from "./orderedItem.controller.js";

export const checkout = async (req, res) => {
    try {
        const userId = req.userId;
        const { address, phone } = req.body;

        const orderRepo = getOrderRepo();
        
        const cartItems = await findById(userId);

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

        const orderedItems = await mapCartItemsToOrderItems(cartItems, order.id);
        
        const successfulItems = orderedItems.filter((item) => item !== null);

        try {
            await deleteCartItems(userId);

        } catch (err) {
            return res.status(400).json({msg: "Error while deleting cart items... "});
        }
        res.status(201).json({ msg: "Order created successfully", order, orderedItems:successfulItems });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error checking out", error: err.message });
    }
};

