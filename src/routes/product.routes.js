import {addProduct, getProductById, getProducts, deleteProduct, updateProduct} from '../controllers/product.controller.js';
import {verifyToken} from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post("/add-product", verifyToken, addProduct);
router.get("/", getProducts);
router.get('/:id', getProductById);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;