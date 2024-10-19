import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { protect, organizer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getEvents)              // Public
    .post(protect, organizer, createEvent);  // Only organizers can create events

router.route('/:id')
    .put(protect, organizer, updateEvent)    // Only organizers can update
    .delete(protect, organizer, deleteEvent); // Only organizers can delete

export default router;
