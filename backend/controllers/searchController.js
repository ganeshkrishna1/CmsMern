import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';

// @desc Search events by title, date, location
// @route GET /api/search
// @access Public
const searchEvents = asyncHandler(async (req, res) => {
    const { query, date, location } = req.query;

    let searchQuery = {
        title: { $regex: query, $options: 'i' },
    };

    if (date) searchQuery.date = date;
    if (location) searchQuery.location = location;

    const events = await Event.find(searchQuery);
    res.json(events);
});

export { searchEvents };
