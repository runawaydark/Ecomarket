import { Router } from 'express';
import { body } from 'express-validator';
import { listProducts, getProduct, createProduct, updateProduct, removeProduct } from '../controllers/products.controller.js';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// público
router.get('/', listProducts);
router.get('/:id', getProduct);
router.get('/health', (req, res) => {
    res.json({ ok: true, where: 'products' });
});

// admin
router.post(
    '/',
    requireAuth, requireAdmin,
    body('name').notEmpty(),
    body('price').isFloat({ gt: 0 }),
    body('category').notEmpty(),
    createProduct
);

router.put(
    '/:id',
    requireAuth, requireAdmin,
    updateProduct
);

router.delete('/:id', requireAuth, requireAdmin, removeProduct);

export default router;
