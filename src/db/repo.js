import Cart from './entities/Cart.js';
import Order from './entities/Order.js';
import CartItem from './entities/CartItem.js';
import Product from './entities/Product.js';
import User from './entities/User.js';
import OrderedItem from './entities/OrderedItem.js';
import Comment from './entities/Comment.js';
import AppDataSource from './data-source.js';

export const getCartRepo = () => {
    const cartRepo = AppDataSource.getRepository(Cart);
    return cartRepo;
}

export const getCartItemRepo = () => {
    const cartItemRepo = AppDataSource.getRepository(CartItem);
    return cartItemRepo;
}

export const getOrderRepo = () => {
    const orderRepo = AppDataSource.getRepository(Order);
    return orderRepo;
}

export const getOrderedItemRepo = () => {
    const orderedItemRepo = AppDataSource.getRepository(OrderedItem);
    return orderedItemRepo;
}

export const getUserRepo = () => {
    const userRepo = AppDataSource.getRepository(User);
    return userRepo;
}

export const getProductRepo = () => {
    const productRepo = AppDataSource.getRepository(Product);
    return productRepo;
}

export const getCommentRepo = () => {
    const commentRepo = AppDataSource.getRepository(Comment);
    return commentRepo;
}