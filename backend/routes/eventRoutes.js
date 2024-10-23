import express from 'express';
import { createEvent, getEvents, getEventById, deleteEvent, updateEvent } from '../controllers/eventController.js';
import { registerAttendee, getEventAttendees } from '../controllers/eventController.js';
import { protect, organizer, attendee, organizerOrAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for creating a new event and getting all events
router.route('/')
  .post(protect, organizer, createEvent)
  .get(getEvents);

// Routes for getting, updating, and deleting a specific event by ID
router.route('/:id')
  .get(getEventById)                   // Public
  .put(protect, organizer, updateEvent) // Only organizer can update
  .delete(protect, organizerOrAdmin, deleteEvent); // Organizer or Admin can delete

// Route for attendee registration
router.post('/:eventId/register', protect, attendee, registerAttendee);

// Route for getting event attendees
router.get('/:eventId/attendees', protect, organizerOrAdmin, getEventAttendees);

export default router;
