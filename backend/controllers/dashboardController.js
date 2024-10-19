import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import Ticket from '../models/Ticket.js';

// @desc Get event statistics for organizer dashboard
// @route GET /api/dashboard/stats
// @access Private/Organizer
const getDashboardStats = asyncHandler(async (req, res) => {
    const organizerId = req.user._id; // Assuming the user is logged in as organizer

    // Get organizer's events
    const events = await Event.find({ createdBy: organizerId });

    const eventStats = await Promise.all(events.map(async (event) => {
        const ticketSales = await Ticket.find({ event: event._id, paymentStatus: 'completed' }).countDocuments();
        const attendees = await Ticket.find({ event: event._id }).populate('attendee', 'name email');
        
        return {
            eventId: event._id,
            eventName: event.title,
            ticketSales,
            attendees,
        };
    }));

    res.json(eventStats);
});

export { getDashboardStats };
