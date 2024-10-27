import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axiosInstance';

const MyEvents = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await axiosInstance.get('/tickets/my-tickets');
        console.log(data);
        
        setTickets(data);
        setLoading(false);
      } catch (error) {
        setError(error.response && error.response.data.message ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading your booked events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const validTickets = tickets.filter(ticket => ticket.event !== null);

  if (validTickets.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500">You have no booked events.</p>
      </div>
    );
  }

  return (
    <div className="my-events container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">My Booked Events</h2>
      <ul className="space-y-4">
        {validTickets.map((ticket) => (
          <li key={ticket._id} className="event-item border border-gray-300 rounded-lg shadow-sm p-4 bg-white">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">{ticket.event.name}</h3>
            <p className="text-gray-700">
              <strong>Date:</strong> {new Date(ticket.event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <strong>Venue:</strong> {ticket.event.venue}
            </p>
            <p className="text-gray-700">
              <strong>Price:</strong> ${ticket.price}
            </p>
            <p className={`text-sm font-medium ${ticket.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
              <strong>Status:</strong> {ticket.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvents;
