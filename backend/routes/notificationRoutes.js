import express from 'express';
import { sendNotification } from '../controllers/notificationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, admin, sendNotification);

export default router;
