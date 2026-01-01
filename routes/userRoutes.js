import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getProfile } from '../controllers/usersController.js';

const router = express.Router();

router.get('/me', authenticate, getProfile);

export default router;
