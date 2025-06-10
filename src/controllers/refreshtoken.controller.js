import jwt from 'jsonwebtoken';
import AppDataSource from '../db/data-source';
import User from '../db/entities/User';
import {generateAccessToken} from '../services/jwt.services';
import dotenv from 'dotenv';
dotenv.config();

export const refreshToken = async (req,res) => {
    const {refreshToken} = req.body;
    if(!refreshToken) {
        return res.status(401).json({error: "Refresh Token not provided"});
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({
            where: {id: payload.userId, refreshToken},
        });

        if(!user) {
            return res.status(403).json({error: "Invalid refresh token"});
        }

        //generate new access token when the refresh token is confirmed to be in the user's entity
        const accessToken = generateAccessToken(user.id);
        
        //return new access token
        res.json({accessToken});
    } catch (err) {
        const userRepo = AppDataSource.getRepository(User);

        if (err.name === "TokenExpiredError") { //thrown by the verify line
        //refresh token expired; remove it from the db
        const user = await userRepo.findOne({ where: { refreshToken } });
        if (user) {
            user.refreshToken = null;
            await userRepo.save(user);
        }
        return res.status(401).json({ error: "Refresh token expired. Please login again." });
        }

        console.error(err);
        res.status(403).json({ error: "Invalid refresh token" });
    }
}