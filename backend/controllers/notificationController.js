import asyncHandler from 'express-async-handler';
import Notification from '../models/Notification.js';
import nodemailer from 'nodemailer';

// @desc Send notification to an attendee
// @route POST /api/notifications/send
// @access Private/Admin
const sendNotification = asyncHandler(async (req, res) => {
    const { userId, eventId, message } = req.body;

    const notification = new Notification({
        user: userId,
        event: eventId,
        message,
    });

    const createdNotification = await notification.save();

    // Sending email notification
    const user = await User.findById(userId); // Assuming the User model is imported
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Example, you can use any email provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Event Notification',
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500);
            throw new Error('Email sending failed');
        } else {
            res.status(200).json({ message: 'Notification sent and email delivered' });
        }
    });
});

export { sendNotification };
