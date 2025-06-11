// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// export default function optionallyVerifyToken(req,res,next)
// {
//     const authHeader = req.headers.authorization;
//     //guest actions; no auth header -> pass null instead of userId
//     if(!authHeader || !authHeader.startsWith('Bearer')) {
//         req.userId = null;
//         next();
//     }
//     else {
//         const token = authHeader.split(' ')[1];
//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.userId = decoded.userId;
//             next(); //if authenticated then pass userId to the route handler
//         } catch(error) {
//             res.status(401).json({error: 'Invalid Token'});
//         }
//     }
// };