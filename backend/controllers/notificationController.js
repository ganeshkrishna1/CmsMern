// controllers/notificationController.js
import asyncHandler from 'express-async-handler';
import Notification from '../models/Notification.js';

// Create a booking notification
export const createBookingNotification = asyncHandler(async (userId, eventId) => {
  const notification = new Notification({
    attendee: userId,
    event: eventId,
    message: 'Your ticket has been booked successfully!',
    type: 'booking',
  });
  await notification.save();
});

// Create a reminder notification
export const createReminderNotification = asyncHandler(async (userId, eventId) => {
  const notification = new Notification({
    attendee: userId,
    event: eventId,
    message: 'Reminder: Your event is tomorrow!',
    type: 'reminder',
  });
  await notification.save();
});

// Get notifications for a specific user
export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ attendee: req.user._id, isRead: false })
    .populate('event', 'name date')
    .sort({ createdAt: -1 });
  res.json(notifications);
});

// Mark notifications as read
export const markNotificationsAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { attendee: req.user._id, isRead: false },
    { isRead: true }
  );
  res.status(200).json({ message: 'Notifications marked as read' });
});
