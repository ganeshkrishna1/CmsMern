import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import User from '../models/User.js';

// Create Event
export const createEvent = asyncHandler(async (req, res) => {
  const { name, date, venue, description, speakers, ticketsAvailable,imageURL } = req.body;

  const event = new Event({
    name,
    date,
    venue,
    description,
    speakers,
    ticketsAvailable,
    imageURL,
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

export const registerAttendee = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user._id; // Assuming the user is authenticated and we have their ID

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user is already registered
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'User already registered for this event' });
    }

    // Add the user to the event's attendees list
    event.attendees.push(userId);
    await event.save();

    res.status(200).json({ message: 'Successfully registered for the event' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getEventAttendees = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId).populate('attendees', 'name email'); // Fetch the event and populate attendee details

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event.attendees); // Send the attendees list
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};