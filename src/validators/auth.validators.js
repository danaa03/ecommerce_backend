import { body } from 'express-validator';

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
];

export const validateSignup = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body('phone').optional().isMobilePhone().withMessage('Phone number is invalid'),
];

export const validateEmailOnly = [
  body('email').isEmail().withMessage('Valid email is required'),
];
