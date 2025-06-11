import express from 'express';
import { login, signup, verifyEmail, resendVerificationToken } from '../controllers/auth.controller.js';
import { validateEmailOnly, validateLogin, validateSignup } from '../validators/auth.validators.js';
import { validate } from '../middlewares/validate.middleware.js';
const router = express.Router();

router.post('/signup', validateSignup, validate, signup);
router.post('/login', validateLogin, validate, login);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', validateEmailOnly, validate, resendVerificationToken);

export default router;
