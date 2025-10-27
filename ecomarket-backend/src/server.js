import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI);

app.get('/', (req, res) => res.send('Servidor EcoMarket funcionando 🚀'));

app.listen(PORT, () => console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`));
