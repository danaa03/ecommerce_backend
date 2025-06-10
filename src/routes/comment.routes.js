import {addComment, deleteComment, updateComment} from '../controllers/comment.controller.js';
import {verifyToken} from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post("/add-comment", verifyToken, addComment);


export default router;