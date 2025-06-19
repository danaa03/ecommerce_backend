import {addProductToCart, mergeCarts} from '../controllers/cart.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/add-product', verifyToken, addProductToCart);
router.post('/merge-carts', verifyToken, mergeCarts);

export default router; 