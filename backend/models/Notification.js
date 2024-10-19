import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
