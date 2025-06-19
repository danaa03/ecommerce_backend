import {addProduct, getProductById, getProducts, deleteProduct, updateProduct, getMyProducts} from '../controllers/product.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post("/add-product", verifyToken, addProduct);
router.get("/my-products", verifyToken, getMyProducts);
router.get("/", getProducts);
router.get('/:id', getProductById);
router.patch('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;