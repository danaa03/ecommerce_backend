import express from 'express';
const app = express();
import authRoutes from './src/routes/auth.routes.js';
import productRoutes from './src/routes/product.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
app.use(express.json());

app.get('/test' , (req,res) => {
    res.send('Welcome to my ecommerce site!');
});

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/comment', commentRoutes);

export default app;
