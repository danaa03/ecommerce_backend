import express from 'express';
import {login, signup, verifyEmail, resendVerificationToken} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationToken);

export default router;
