import express from 'express';
const app = express();
import authRoutes from './src/routes/auth.routes.js';
import productRoutes from './src/routes/product.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import cartRoutes from './src/routes/cart.routes.js';
import orderRoutes from './src/routes/order.routes.js';
import refreshRoutes from './src/routes/refreshToken.routes.js';
import searchRoutes from './src/routes/search.routes.js';

app.use(express.json());

app.get('/test' , (req,res) => {
    res.send('Welcome to my ecommerce site!');
});

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/comment', commentRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/refresh', refreshRoutes);
app.use('/search', searchRoutes);

export default app;
