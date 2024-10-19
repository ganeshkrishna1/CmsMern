import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Reference to speakers
    ticketsAvailable: { type: Number, required: true, default: 100 },
    ticketPrice: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Organizer
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
