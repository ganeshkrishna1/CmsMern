import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';

// Create Event
export const createEvent = asyncHandler(async (req, res) => {
  const { name, date, venue, description, speakers, ticketsAvailable } = req.body;

  const event = new Event({
    name,
    date,
    venue,
    description,
    speakers,
    ticketsAvailable,
    organizer: req.user._id,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// Get All Events
export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// Get Event by ID
export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});
