import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function verifyToken(req,res,next)
{
    const token = authHeader.split(' ')[1];
    if(!token)
        return res.status(401).json({error: 'Access Denied'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        res.status(401).json({error: 'Invalid Token'});
    }
};