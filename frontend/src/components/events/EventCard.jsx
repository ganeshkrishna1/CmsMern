// src/components/EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img
        className="w-full h-48 object-cover"
        src={event.imageURL} // Use imageURL from event data
        alt={event.name}
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800">{event.name}</h3>
        <p className="text-gray-600 mt-2">
          {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
        </p>
        <p className="text-gray-700 mt-4">{event.description.slice(0, 100)}...</p>
        <p className="text-gray-600 mt-2">Venue: {event.venue}</p>
        <p className="text-gray-600 mt-2">Tickets Available: {event.ticketsAvailable}</p>
        <Link
          to={`/events/${event._id}`}
          className="inline-block mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
