import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  speakers: [
    {
      name: String,
      bio: String,
      topic: String,
    },
  ],
  ticketsAvailable: {
    type: Number,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
