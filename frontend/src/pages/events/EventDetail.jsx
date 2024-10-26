import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../services/axiosInstance';
import { isAdmin, isOrganizer } from '../../services/localStorageInfo';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [isBooking, setIsBooking] = useState(false); // State for booking status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axiosInstance.get(`/events/${eventId}`);
        setEvent(data);
        debugger
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  // Function to handle ticket booking
  const handleBookTicket = async () => {
    setIsBooking(true);
    try {
      const response = await axiosInstance.post('/tickets/book', {
        eventId: eventId, // Event ID from the URL param
        price: event.price // Assuming event data contains price
      });
      console.log('Ticket booked:', response.data);
      setIsModalOpen(false); // Close the modal on success
    } catch (error) {
      console.error('Error booking ticket:', error);
      setError('Could not book the ticket, please try again.');
    } finally {
      setIsBooking(false); // Reset booking state
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
          src={event.imageURL} // Use imageURL from event data
          alt={event.name}
        />
        <h1 className="text-4xl font-semibold text-gray-800 mt-4">{event.name}</h1>
        <p className="text-gray-600 mt-2">
          {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
        </p>
        <p className="text-gray-600 mt-2">Venue: {event.venue}</p>
        <p className="text-gray-600 mt-2">Price: {event.price} $</p>
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

        {(!isOrganizer() || !isAdmin()) && (
          <button
            className="mt-8 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            Book Ticket
          </button>
        )}
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
                onClick={() => setIsModalOpen(false)} // Close modal
              >
                Cancel
              </button>
              <button
                className={`bg-green-600 text-white py-2 px-4 rounded-md ${isBooking ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                onClick={handleBookTicket} // Trigger booking on click
                disabled={isBooking} // Disable button during booking
              >
                {isBooking ? 'Booking...' : 'Confirm'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>} {/* Show error if any */}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;