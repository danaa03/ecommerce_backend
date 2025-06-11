import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { //if an error was raised by the previous middleware, raise status code 400 and return the error
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
