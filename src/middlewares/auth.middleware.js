import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function verifyToken(req,res,next)
{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({error: 'Access Denied: No token provided!'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        console.log(req.userId, decoded.userId);
        next();
    } catch(error) {
        res.status(401).json({error: 'Invalid Token'});
    }
};