import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../services/axiosInstance';
import { isAdmin, isOrganizer, isOrganizerOrAdmin } from '../../services/localStorageInfo';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState(null);
  const [hasBooked, setHasBooked] = useState(false); // State for checking if already booked

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Fetch event details
        const { data } = await axiosInstance.get(`/events/${eventId}`);
        setEvent(data);

        // Check if the user has already booked this event
        const bookingResponse = await axiosInstance.get(`/tickets/user`);
        const bookedEvent = bookingResponse.data.find(ticket => ticket.event._id === eventId);
        setHasBooked(Boolean(bookedEvent)); // Update the booking status

        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleBookTicket = async () => {
    setIsBooking(true);
    try {
      const response = await axiosInstance.post('/tickets/book', {
        eventId: eventId,
        price: event.price,
      });
      console.log('Ticket booked:', response.data);
      setIsModalOpen(false); // Close modal on success
      setHasBooked(true); // Update booking status
      window.location.reload();
    } catch (error) {
      console.log('Error booking ticket:', error);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Could not book the ticket, please try again.'
      );
    } finally {
      setIsBooking(false);
    }
  };

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
          src={event.imageURL}
          alt={event.name}
        />
        <h1 className="text-4xl font-semibold text-gray-800 mt-4">{event.name}</h1>
        <p className="text-gray-600 mt-2">
          {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
        </p>
        <p className="text-gray-600 mt-2">Venue: {event.venue}</p>
        <p className="text-gray-600 mt-2">Price:  ${event.price}</p>
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

        {!isOrganizerOrAdmin() && !hasBooked && (
          <button
            className="mt-8 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            Book Ticket
          </button>
        )}

        {hasBooked && <p className="mt-4 text-green-500">You have already booked a ticket for this event.</p>}
      </div>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Confirm Ticket Booking</h2>
            <p className="mt-4">Are you sure you want to book a ticket for {event.name}?</p>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-4"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`bg-green-600 text-white py-2 px-4 rounded-md ${
                  isBooking ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
                onClick={handleBookTicket}
                disabled={isBooking}
              >
                {isBooking ? 'Booking...' : 'Confirm'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
