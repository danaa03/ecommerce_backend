import express from 'express';
const app = express();
import authRoutes from './src/routes/auth.routes.js';
app.use(express.json());

app.get('/test' , (req,res) => {
    res.send('Welcome to my ecommerce site!');
});


app.use('/auth', authRoutes);

export default app;
