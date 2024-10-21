import express from 'express';
import { createEvent, getEvents, getEventById } from '../controllers/eventController.js';
import { registerAttendee, getEventAttendees } from '../controllers/eventController.js';
import { protect,organizer, attendee, organizerOrAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, organizer, createEvent)
  .get(getEvents);

router.route('/:id')
  .get(getEventById);

// Register for an event
router.post('/:eventId/register', protect, attendee, registerAttendee);

// Get attendees for a specific event
router.get('/:eventId/attendees', protect, organizerOrAdmin, getEventAttendees);

export default router;
