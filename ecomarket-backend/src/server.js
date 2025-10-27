import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'ecomarket-backend', time: new Date().toISOString() });
});

// MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecomarket';
mongoose.connect(MONGODB_URI)
    .then(() => {
    console.log('✅ MongoDB conectado');
    })
    .catch(err => {
    console.error('❌ Error conectando a MongoDB', err.message);
    process.exit(1);
    });

// server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 API escuchando en http://localhost:${PORT}`);
});

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/orders.routes.js';

// prefix API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
