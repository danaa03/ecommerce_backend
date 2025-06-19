import express from "express";
import router from express.Router();
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'));

export default router;