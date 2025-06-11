import { getCartRepo, getCartItemRepo, getProductRepo } from "../db/repo.js";

export const addProductToCart = async(req,res) => {
    try {
        const {productId, cartId} = req.body;
        const userId = req.userId;
        const cartRepo = getCartRepo();
        const cartItemRepo = getCartItemRepo();

        const cart = await cartRepo.findOne({
            where: {
                id: cartId,
                user: {id: userId}
            },
        });

        if(!cart)
        {
            return res.status(404).json({msg: "error! cart does not exist for the current user!"});
        }

        //check if the entry already exists in the db
        const existingCartItem = await cartItemRepo.findOne({
            where: {
                cart: {id: cartId},
                product: {id: productId}
            },
        });

        let cartItem;

        if(!existingCartItem) //if product not already added to cart
        {
            cartItem = cartItemRepo.create({
            cart: { id: cart.id },
            product: { id: parseInt(productId) },
            quantity: 1
            });
            cartItem = await cartItemRepo.save(cartItem);
        }
        else { //product already in cart? increment count
            existingCartItem.quantity+=1;
            cartItem = await cartItemRepo.save(existingCartItem);
        }
        res.status(201).json({msg: 'Product successfully added to cart!', cart_item: cartItem});

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Error adding product to cart'});
    }
};

export const removeProductFromCart = async(req,res) => {
    try {
        const {cartItemId, cartId} = req.body;
        const userId = req.userId;
        const cartItemRepo = getCartItemRepo();

        //check if the cart item already exists against the current user
        const cartItem = await cartItemRepo.findOne({
        where: {
            id: cartItemId,
            cart: {
                id: cartId,
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
            await cartItemRepo.delete(cartItem);
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

//we are essentially just receiving an object from the frontend, which it will have fetched from its own local storage
export const mergeCarts = async (req,res) => {
    const userId = req.userId;
    const {guestCart} = req.body;

    const productRepo = getProductRepo();
    const cartItemRepo = getCartItemRepo();
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
            console.log(item, " ");
            let {productId, quantity} = item;
            const product = await productRepo.findOne({
            where: {
                id: productId,
            }});
            if(product)
            {
                //if the product exists but isnt in cart_items for that user's cart
                let cartItem = await cartItemRepo.findOne({
                    where: {
                        product: {id: productId},
                        cart: { 
                            id: cart.id,
                            user: {id: userId},
                        },
                    },
                    relations: ["cart", "cart.user"],
                });
                if (cartItem)
                {
                    cartItem.quantity+=quantity;
                }
                else {
                    cartItem = cartItemRepo.create({
                        cart: {id: cart.id},
                        product: {id: productId},
                        quantity: quantity,
                    });
                }
                cartItem = await cartItemRepo.save(cartItem);
                newCartItems.push(cartItem);
            }
        }

        res.status(201).json({msg: "Carts merged successfully!", cartItems: newCartItems});

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Error merging carts"});
    }
};