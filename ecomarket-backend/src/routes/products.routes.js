import { Router } from 'express';
import Product from '../models/product.js';
const router = Router();

router.post('/', async (req, res) => {
    const prod = await Product.create(req.body);
    res.status(201).json(prod);
});

router.get('/', async (_req, res) => {
    const list = await Product.find().populate('category').lean();
    res.json(list);
});

export default router;
