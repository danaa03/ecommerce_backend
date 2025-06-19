import { removeProductFromCart, viewCartItemCount, viewCartItems } from '../controllers/cartItem.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.delete('/remove-product', verifyToken, removeProductFromCart);
router.get('/count', verifyToken, viewCartItemCount);
router.get('/', verifyToken, viewCartItems);

export default router; 