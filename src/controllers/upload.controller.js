import s3 from '../config/s3.config.js';
import dotenv from 'dotenv';

dotenv.config();

export const imageUpload =  async (req, res) => {
  const file = req.file;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    res.json({ imageUrl: data.Location });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
};
