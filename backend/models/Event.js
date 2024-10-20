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
    required: true,
  },
  speakers: [
    {
      name: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
        required: true,
      },
      topic: {
        type: String,
        required: true,
      },
    },
  ],
  ticketsAvailable: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true, // Ensure the image URL is provided
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
