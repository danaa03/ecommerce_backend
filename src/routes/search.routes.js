import { searchProducts } from "../controllers/search.controller.js";
import express from 'express';
const router = express.Router();

router.get('/', searchProducts);

export default router;
