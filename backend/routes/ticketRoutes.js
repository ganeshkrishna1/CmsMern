import express from 'express';
import { registerForEvent } from '../controllers/ticketController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', protect, registerForEvent);

export default router;
