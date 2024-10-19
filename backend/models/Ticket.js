import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({
    attendee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    qrCode: { type: String }, // Store generated QR code
    ticketPrice: { type: Number, required: true },
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
