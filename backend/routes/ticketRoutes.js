import express from 'express';
import { bookTicket, getUserTickets } from '../controllers/ticketController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/book').post(protect, bookTicket);
router.route('/mytickets').get(protect, getUserTickets);

export default router;
