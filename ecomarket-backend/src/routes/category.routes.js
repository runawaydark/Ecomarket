import { Router } from 'express';
import * as ctrl from '../controllers/category.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

// públicas
router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);

// protegidas (admin)
router.post('/', auth.requireAdmin, ctrl.create);
router.put('/:id', auth.requireAdmin, ctrl.update);
router.delete('/:id', auth.requireAdmin, ctrl.remove);

export default router;
