import { updateUser } from '../controllers/user.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.patch('/update', verifyToken, updateUser);

export default router; 