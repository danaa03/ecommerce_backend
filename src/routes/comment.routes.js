import { addComment, deleteComment, updateComment } from '../controllers/comment.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post("/add-comment", verifyToken, addComment);
router.put("/update-comment", verifyToken, updateComment);
router.delete("/delete-comment", deleteComment);

export default router;