import {addProductToCart, removeProductFromCart, mergeCarts} from '../controllers/cart.controller.js';
// import verifyOptionalToken from '../middlewares/optionalAuth.middleware.js';
import verifyToken from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/add-product', verifyToken, addProductToCart);
router.delete('/remove-product', verifyToken, removeProductFromCart);
router.post('/merge-carts', verifyToken ,mergeCarts);

export default router; 