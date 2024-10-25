// controllers/ticketController.js
import asyncHandler from 'express-async-handler';
import Ticket from '../models/Ticket.js';
import Event from '../models/Event.js';

// Fetch all booked events (tickets) for a specific user
export const getUserTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Ticket.find({ attendee: req.user._id })
      .populate({
        path: 'event',
        select: 'name date venue', // Include only specific fields from Event
      });

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No booked events found' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Book a Ticket (for reference; can be part of the same controller)
export const bookTicket = asyncHandler(async (req, res) => {
  const { eventId, price } = req.body;

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  const ticket = new Ticket({
    event: event._id,
    attendee: req.user._id,
    price,
  });

  const bookedTicket = await ticket.save();
  res.status(201).json(bookedTicket);
});
