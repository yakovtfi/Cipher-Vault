import express from 'express';
import authRoutes from './authRoutes.js';
import messageRoutes from './messageRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/messages', messageRoutes);
router.use('/users', userRoutes);

export default router;
