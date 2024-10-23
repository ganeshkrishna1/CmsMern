// src/pages/EventList.jsx
import React, { useState, useEffect } from 'react';
import {axiosInstance } from '../../services/axiosInstance'
import EventCard from '../../components/events/EventCard';
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { isOrganizer } from '../../services/localStorageInfo';


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosInstance.get('/events'); // Ensure your API endpoint is correct
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);


  const handleAddEvents =() =>{
    navigate('/events/new');
  }
  const handleDelete = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Upcoming Events</h1>
      {isOrganizer() && 
      <div className='flex cursor-pointer p-3' onClick={handleAddEvents}>
        <IoMdAddCircleOutline className='text-4xl'/>
        <p className='text-2xl'>AddEvents</p>
      </div>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {events.map((event) => (
          <EventCard key={event._id} event={event} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
