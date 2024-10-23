// src/components/EventCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { axiosInstance } from "../../services/axiosInstance";



const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails =()=>{
    navigate(`/events/${event._id}`);
  }

  const handleEditDetails =()=>{
    navigate(`/events/edit/${event._id}`)
  }

  const handleDeleteDetails = async () => {
    try {
      await axiosInstance.delete(`/events/${event._id}`);
      onDelete(event._id); // Trigger the delete callback passed from the parent
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

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
          {new Date(event.date).toLocaleDateString()} at{" "}
          {new Date(event.date).toLocaleTimeString()}
        </p>
        <p className="text-gray-700 mt-4">
          {event.description.slice(0, 100)}...
        </p>
        <p className="text-gray-600 mt-2">Venue: {event.venue}</p>
        <p className="text-gray-600 mt-2">
          Tickets Available: {event.ticketsAvailable}
        </p>
        <div className="flex justify-end items-end gap-4">
          <FaEye onClick={handleViewDetails} className="text-3xl text-blue-500 cursor-pointer" />
          <FaEdit onClick={handleEditDetails} className="text-3xl text-orange-400 cursor-pointer" />
          <AiFillDelete onClick={handleDeleteDetails} className="text-3xl text-red-500 cursor-pointer" />
          
        </div>
      </div>
    </div>
  );
};

export default EventCard;
