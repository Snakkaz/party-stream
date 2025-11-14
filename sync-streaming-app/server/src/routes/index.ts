import { Router } from 'express';
import roomRoutes from './roomRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/rooms', roomRoutes);
router.use('/users', userRoutes);

export default router;