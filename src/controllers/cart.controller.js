import { getCartRepo, getCartItemRepo, getProductRepo } from "../db/repo.js";

export const addProductToCart = async(req,res) => {
    try {
        const {productId} = req.body;
        const userId = req.userId;
        const cartRepo = getCartRepo();
        const cartItemRepo = getCartItemRepo();
        const productRepo = getProductRepo();

        const cart = await cartRepo.findOne({
            where: {
                user: {id: userId}
            },
        });

        if(!cart)
        {
            return res.status(404).json({msg: "error! cart does not exist for the current user!"});
        }

        //check if the product was posted by the user 
        const product = await productRepo.findOne({
            where: {
                id: productId,
                user: {id: userId},
            },
        })
        if(product)
            return res.status(404).json({msg: "cannot add own product to cart"});
        //check if the entry already exists in the db
        const existingCartItem = await cartItemRepo.findOne({
            where: {
                cart: {id: cart.id},
                product: {id: productId},
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
            let {id:cartItemId, quantity, product: {id:productId, price, name}} = item;
            const product = await productRepo.findOne({
            where: {
                id: productId,
            }});
            if(product)
            {
                //if the product exists but isnt in cart_items for that user's cart
                let cartItem = await cartItemRepo.findOne({
                    where: {
                        product: {
                            id: productId,
                        },
                        cart: { 
                            user: {id: userId},
                        },
                    },
                    relations: ["cart", "cart.user", "product"],
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

export const viewCartItems = async(req,res) => {
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
