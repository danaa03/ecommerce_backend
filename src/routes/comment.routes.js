import { addComment, deleteComment, updateComment, getComments } from '../controllers/comment.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post("/add-comment", verifyToken, addComment);
router.patch("/update/:id", verifyToken, updateComment);
router.delete("/delete/:id", verifyToken, deleteComment);
router.get("/:id", getComments);

export default router;