// src/pages/EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {axiosInstance } from '../../services/axiosInstance'

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axiosInstance.get(`/events/${eventId}`);
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!event) {
    return <div className="text-center mt-10">Event not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <img
          className="w-full h-64 object-cover rounded-lg"
          src={event.imageURL} // Use imageURL from event data
          alt={event.name}
        />
        <h1 className="text-4xl font-semibold text-gray-800 mt-4">{event.name}</h1>
        <p className="text-gray-600 mt-2">
          {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
        </p>
        <p className="text-gray-600 mt-2">Venue: {event.venue}</p>
        <p className="text-gray-700 mt-6">{event.description}</p>

        <h3 className="text-2xl font-semibold mt-8">Speakers</h3>
        <ul className="list-disc pl-6 mt-2">
          {event.speakers.map((speaker, index) => (
            <li key={index} className="text-gray-700">
              <strong>{speaker.name}</strong> - {speaker.topic}: {speaker.bio}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-gray-600">Tickets Available: {event.ticketsAvailable}</p>

        <button
          className="mt-8 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
          onClick={() => alert('Ticket booking functionality to be added')}
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
