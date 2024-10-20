import express from 'express';
import { createEvent, getEvents, getEventById } from '../controllers/eventController.js';
import { protect, organizer } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, organizer, createEvent)
  .get(getEvents);

router.route('/:id')
  .get(getEventById);

export default router;
