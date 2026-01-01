import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { encryptMessage, decryptMessage, listMessages } from '../controllers/messagesController.js';

const router = express.Router();

router.post('/encrypt', authenticate, encryptMessage);
router.post('/decrypt', authenticate, decryptMessage);
router.get('/', authenticate, listMessages);

export default router;
