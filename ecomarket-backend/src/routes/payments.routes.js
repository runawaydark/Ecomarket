import { Router } from 'express';
import * as payments from '../controllers/payments.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

// Crear un pago (simulación o real)
router.post('/checkout', auth.requireAuth, payments.createPayment);

// Ver historial de pagos (solo admin)
router.get('/', auth.requireAdmin, payments.listPayments);

export default router;
