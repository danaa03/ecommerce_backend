import { getCartItemRepo, getCartRepo } from "../db/repo.js";

export const checkExistingCartItem = async (userId, productId) => {
    const cartItemRepo = getCartItemRepo();
    try {
        return await cartItemRepo.findOne({
            where: {
                cart: {
                    user:{
                        id: userId,
                    },
                },
                product: {id: productId},
            },
        });

    } catch (err) {
        throw err;
    }
}

export const createCartItem = async (cartId, productId) => {
    const cartItemRepo = getCartItemRepo();
    try {
        let cartItem = cartItemRepo.create({
            cart: { id: cartId },
            product: { id: parseInt(productId) },
            quantity: 1
        });
        cartItem = await cartItemRepo.save(cartItem);
        return cartItem;

    } catch (err) {
        throw err;
    }
}

export const createCartItemWthQuantity = async (cartId, productId, quantity) => {
    const cartItemRepo = getCartItemRepo();
    try {
         cartItem = cartItemRepo.create({
            cart: {id: cartId},
            product: {id: productId},
            quantity: quantity,
        });
        return cartItem;

    } catch (err) {
        throw err;
    }
}

export const updateCartItem = async (existingCartItem) => {
    const cartItemRepo = getCartItemRepo();
    try {
        const cartItem = await cartItemRepo.save(existingCartItem);
        return cartItem;

    } catch (err) {
        throw err;
    }
}

export const deleteCartItems = async (userId) => {
    const cartItemRepo = getCartItemRepo();
    try {
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

    } catch (err) {
        throw err;
    }
}
   
export const removeProductFromCart = async(req,res) => {
    try {
        const {cartItemId} = req.body;
        const userId = req.userId;
        const cartItemRepo = getCartItemRepo();

        //check if the cart item already exists against the current user
        const cartItem = await cartItemRepo.findOne({
        where: {
            id: cartItemId,
            cart: {
                user: { id: userId }
            }
        },
            relations: ["cart", "cart.user"]
        });
        if (!cartItem) {
            return res.status(404).json({ msg: "Cart item not found or does not belong to user." });
        }

        //if quantity is 1 remove entry from table
        if (cartItem.quantity === 1)
        {
            await cartItemRepo.delete(cartItem.id);
        }
        else if (cartItem.quantity>1)
        {
            cartItem.quantity-=1;
            await cartItemRepo.save(cartItem);
        }
        res.status(201).json({msg: 'Product successfully removed from cart!'});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Error removing product from cart'});
    }
};

export const viewCartItemCount = async(req,res) => {
    try {
        const userId = req.userId;
        const cartItemRepo = getCartItemRepo();

        const cartItems = await cartItemRepo.find({
        where: {
            cart: {
                user: { id: userId }
            }
        },
            relations: ["cart", "cart.user"]
        });
        if (!cartItems) {
            res.status(201).json({msg: 'Here are the users cart items: ', count: 0});
        }
        
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        res.status(200).json({ msg: 'Total cart item quantity', count: totalQuantity });
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Error fetching cart items'});
    }
};

export const findById = async (userId) => {
    const cartItemRepo = getCartItemRepo();
    const cartItems = await cartItemRepo.find({
        where: {
            cart: {
                user: { id: userId }
            }
        },
    });
    return cartItems;
}

export const viewCartItems = async(req,res) => {
    try {
        const userId = req.userId;
        const cartItemRepo = getCartItemRepo();

        const cartItems = await findById(userId);

        if (!cartItems) {
            return res.status(404).json({ msg: "Cart items not found or does not belong to user." });
        }

        const response = cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            product: {
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                seller: item.product.user.name,
                sellersContact: item.product.user.phone
            }
        }));

        res.status(201).json({msg: 'Here are the users cart items: ', response});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Error fetching cart items'});
    }
};
