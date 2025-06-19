import { getOrderedItemRepo } from "../db/repo.js";

export const mapCartItemsToOrderItems = async (cartItems, orderId) => {
    const orderedItemRepo = getOrderedItemRepo();   
    try {
        const orderedItems = await Promise.all(
        cartItems.map(async (cartItem) => {
            try {
                const orderedItem = orderedItemRepo.create({
                    price: cartItem.product.price,
                    quantity: cartItem.quantity,
                    order: { id: orderId },
                    product: { id: cartItem.product.id },
                    cartItem: { id: cartItem.id },
                });

                const saved = await orderedItemRepo.save(orderedItem);
                saved.product.name = cartItem.product.name;
                console.log(saved);
                return saved;
            } 
            catch (err) {
            console.error("Failed to save orderedItem for:", cartItem.product.name, err);
            return null;
            }
        }));

        return orderedItems;

    } catch (err) {
        throw err;
    }
}
