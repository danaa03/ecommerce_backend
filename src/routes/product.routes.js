import {addProduct, getProductById, getProducts, deleteProduct, updateProduct} from '../controllers/product.controller.js';
import {verifyToken} from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post("/add-product", verifyToken, addProduct);
router.get("/", getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

export default router;