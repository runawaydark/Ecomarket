import { Router } from 'express';
import { body } from 'express-validator';
import { login, me, register } from '../controllers/auth.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post(
    '/register',
    body('name').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    register
);

router.post(
    '/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    login
);

router.get('/me', requireAuth, me);

export default router;
