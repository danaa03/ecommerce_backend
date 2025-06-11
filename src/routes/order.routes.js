import express from 'express';
import { checkout } from '../controllers/order.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/checkout', verifyToken, checkout);

export default router;