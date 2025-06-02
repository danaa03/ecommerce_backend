import dotenv from 'dotenv';
import AppDataSource from '../../data-source.js';
import User from '../db/entities/User.js';
import jwt from 'jsonwebtoken';
dotenv.config();

export const existingUser = async(email) =>
{
    const userRepo = AppDataSource.getRepository(User);
    return await userRepo.findOne({ where: { email } });
}

export const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } 
    );

    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } 
    );

    return { accessToken, refreshToken };
};