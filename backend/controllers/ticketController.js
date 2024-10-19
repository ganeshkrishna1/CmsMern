import asyncHandler from 'express-async-handler';
import Ticket from '../models/Ticket.js';
import qr from 'qr-image'; // QR code generator

// @desc Register for an event and generate QR code
// @route POST /api/tickets/register
// @access Private/Attendee
const registerForEvent = asyncHandler(async (req, res) => {
    const { eventId, ticketPrice } = req.body;
    const attendeeId = req.user._id;

    const ticket = new Ticket({
        attendee: attendeeId,
        event: eventId,
        ticketPrice,
        paymentStatus: 'pending',
    });

    const createdTicket = await ticket.save();

    // Generate QR code
    const qrCode = qr.imageSync(`ticket_${createdTicket._id}`, { type: 'svg' });
    createdTicket.qrCode = qrCode;
    await createdTicket.save();

    res.status(201).json({ message: 'Registration successful', ticket: createdTicket });
});

export { registerForEvent };
