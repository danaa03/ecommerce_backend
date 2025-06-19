import { getCartRepo, getCartItemRepo, getProductRepo } from "../db/repo.js";
import { checkProductOwner, findProductById } from "./product.controller.js";
import { checkExistingCartItem, createCartItem, updateCartItem, createCartItemWthQuantity } from "./cartItem.controller.js";

export const addProductToCart = async(req,res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;
        const cartRepo = getCartRepo();

        const cart = await cartRepo.findOne({
            where: {
                user: {id: userId}
            },
        });

        if(!cart)
        {
            return res.status(404).json({msg: "error! cart does not exist for the current user!"});
        }

        await checkProductOwner(productId, userId);

        //check if the entry already exists in the db
        const existingCartItem = await checkExistingCartItem(userId, productId);

        let cartItem;

        if(!existingCartItem) //if product not already added to cart
        {
            cartItem = await createCartItem(cart.id, productId);
        }
        else { //product already in cart? increment count
            existingCartItem.quantity+=1;
            cartItem = await updateCartItem(existingCartItem);
        }
        res.status(201).json({msg: 'Product successfully added to cart!', cart_item: cartItem});

    } catch (err) {
        if (err.message === "cannot add own product to cart") {
            return res.status(404).json({ msg: err.message });
        }
        console.log(err);
        res.status(500).json({msg: 'Error adding product to cart'});
    }
};

//we are essentially just receiving an object from the frontend, which it will have fetched from its own local storage
export const mergeCarts = async (req,res) => {
    const userId = req.userId;
    const {guestCart} = req.body;

    const cartRepo = getCartRepo();

    try {
        //check if cartId exists against user
        const cart = await cartRepo.findOne({
        where: {
            user: { id: userId },
        }});
        if (!cart)
        {
            return res.status(404).json({msg: "Cart not found"});
        }
        let newCartItems = [];
        //now check if each product exists and then add as a cart item to the user's cart
        for (const item of guestCart)
        {
            let { quantity, product: {id:productId}} = item;
            const product = await findProductById(productId);

            if(product)
            {
                let cartItem = checkExistingCartItem(userId, productId);

                if (cartItem)
                {
                    cartItem.quantity+=quantity;
                }
                else {
                    if(product.user.id!==userId)
                        cartItem = await createCartItemWithQuantity(userId, productId, quantity);
                }
                if ( cartItem)
                {cartItem = await updateCartItem(cartItem);
                newCartItems.push(cartItem);}
            }
        }
        res.status(201).json({msg: "Carts merged successfully!", cartItems: newCartItems});

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Error merging carts"});
    }
};

export const createCart = async(userId) => {
    try {
        //create a cart and assign the cartId to the user
        const cartRepo = getCartRepo();
        const cart = {
            user: {id: userId}
        };
        await cartRepo.save(cart);
    } catch (err) {
        console.log(err);
        throw err;
    }
}