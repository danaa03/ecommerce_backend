import jwt from 'jsonwebtoken';
import { getUserRepo } from '../db/repo.js';
import {generateAccessToken} from '../services/jwt.services.js';
import dotenv from 'dotenv';
dotenv.config();

export const refreshToken = async (req,res) => {
    const {refreshToken, accessToken} = req.body;
    if(!refreshToken ||!accessToken) {
        return res.status(401).json({error: "Refresh Token or Access Token not provided"});
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const userRepo = getUserRepo();

        const user = await userRepo.findOne({
            where: {id: payload.userId, refreshToken},
        });

        if(!user) {
            return res.status(403).json({error: "Invalid refresh token"});
        }

        if (user.accessToken && user.accessToken !== accessToken) {
            return res.status(401).json({ error: "Access token mismatch. Possible session hijack." });
        }

        const newAccessToken = generateAccessToken(user.id);
        //save in user repo
        user.accessToken = newAccessToken;
        const newUser = await userRepo.save(user);
        
        //return new access token
        res.json({ newAccessToken });
    } catch (err) {
        const userRepo = getUserRepo();

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