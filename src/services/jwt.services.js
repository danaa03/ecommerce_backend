import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

dotenv.config();

export const generateAccessToken = (userId) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } 
    );

    return accessToken;
};

export const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } 
    );

    return refreshToken;
};

export const generateEmailVerificationToken = () => {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000); //30 mins
    return {verificationToken,verificationTokenExpires};
};