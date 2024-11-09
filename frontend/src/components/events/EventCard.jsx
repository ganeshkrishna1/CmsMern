import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { axiosInstance } from "../../services/axiosInstance";
import { isOrganizerOrAdmin } from "../../services/localStorageInfo";
import { differenceInCalendarDays, parseISO } from "date-fns";

const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();

  // Calculate days left for the event using differenceInCalendarDays
  const daysLeft = differenceInCalendarDays(parseISO(event.date), new Date());

  // Determine if the event is happening today, tomorrow, or soon
  const isToday = daysLeft === 0;
  const isSoon = daysLeft > 0 && daysLeft <= 7;

  // Calculate if tickets are below the 30% threshold
  const totalCapacity = event.totalCapacity || 100; // Default to 100 if not provided
  const ticketsThreshold = Math.floor(totalCapacity * 0.3);
  const fewTicketsLeft = event.ticketsAvailable <= ticketsThreshold;

  // Handle navigation to event details
  const handleViewDetails = () => {
    navigate(`/all-users/events/${event._id}`);
  };

  // Handle editing event details
  const handleEditDetails = () => {
    navigate(`/all-users/events/edit/${event._id}`);
  };

  // Handle event deletion
  const handleDeleteDetails = async () => {
    try {
      await axiosInstance.delete(`/events/${event._id}`);
      onDelete(event._id); // Trigger the delete callback
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      {/* Event Image */}
      <img
        className="w-full h-48 object-cover"
        src={event.imageURL}
        alt={event.name}
      />

      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800">{event.name}</h3>
        <p className="text-gray-600 mt-2">
          {new Date(event.date).toLocaleDateString()} at{" "}
          {new Date(event.date).toLocaleTimeString()}
        </p>
        <p className="text-gray-700 mt-4">{event.description.slice(0, 100)}...</p>
        <p className="text-gray-600 mt-2">Venue: {event.venue}</p>

        {/* Tickets Availability */}
        <p className={`text-gray-600 mt-2 ${fewTicketsLeft ? 'text-red-500 font-bold' : ''}`}>
          Tickets Available: {event.ticketsAvailable}
        </p>

        {/* Highlight if tickets are limited */}
        {fewTicketsLeft && (
          <p className="text-red-600 font-bold mt-2">Few tickets left!</p>
        )}

        {/* Highlight if event is happening soon */}
        {isToday && (
          <p className="text-green-600 font-bold mt-2">Happening Today!</p>
        )}
        {daysLeft === 1 && (
          <p className="text-yellow-600 font-bold mt-2">1 day left!</p>
        )}
        {isSoon && daysLeft > 1 && (
          <p className="text-yellow-600 font-bold mt-2">{daysLeft} days left</p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end items-end gap-4 mt-4">
          <FaEye
            onClick={handleViewDetails}
            className="text-3xl text-blue-500 cursor-pointer"
          />
          {isOrganizerOrAdmin() && (
            <>
              <FaEdit
                onClick={handleEditDetails}
                className="text-3xl text-orange-400 cursor-pointer"
              />
              <AiFillDelete
                onClick={handleDeleteDetails}
                className="text-3xl text-red-500 cursor-pointer"
                data-testid={`${event._id}`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
