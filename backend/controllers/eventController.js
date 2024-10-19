import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';

// @desc Get all events
// @route GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({}).populate('speakers', 'name');
    res.json(events);
});

// @desc Create an event
// @route POST /api/events
// @access Private/Organizer
const createEvent = asyncHandler(async (req, res) => {
    const { title, description, date, location, speakers, ticketsAvailable, ticketPrice } = req.body;

    const event = new Event({
        title,
        description,
        date,
        location,
        speakers,
        ticketsAvailable,
        ticketPrice,
        createdBy: req.user._id // Organizer
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
});

// @desc Update an event
// @route PUT /api/events/:id
// @access Private/Organizer
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;
        event.speakers = req.body.speakers || event.speakers;
        event.ticketsAvailable = req.body.ticketsAvailable || event.ticketsAvailable;
        event.ticketPrice = req.body.ticketPrice || event.ticketPrice;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } else {
        res.status(404);
        throw new Error('Event not found');
    }
});

// @desc Delete an event
// @route DELETE /api/events/:id
// @access Private/Organizer
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
        await event.deleteOne();
        res.json({ message: 'Event removed' });
    } else {
        res.status(404);
        throw new Error('Event not found');
    }
});

export { getEvents, createEvent, updateEvent, deleteEvent };
