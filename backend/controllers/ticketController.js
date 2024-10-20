import asyncHandler from 'express-async-handler';
import Ticket from '../models/Ticket.js';
import Event from '../models/Event.js';

// Book a Ticket
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

// Get User Tickets
export const getUserTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ attendee: req.user._id }).populate('event');
  res.json(tickets);
});
