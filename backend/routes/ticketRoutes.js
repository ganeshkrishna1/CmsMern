// routes/ticketRoutes.js
import express from 'express';
import { getUserTickets, bookTicket } from '../controllers/ticketController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to get all tickets for a specific user
router.get('/my-tickets', protect, getUserTickets);

// Route to book a new ticket (for reference)
router.post('/book', protect, bookTicket);

export default router;
