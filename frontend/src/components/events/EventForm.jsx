// src/components/EventForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EventForm = ({ eventId }) => {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    venue: '',
    description: '',
    speakers: [{ name: '', bio: '', topic: '' }],
    ticketsAvailable: 0,
    imageURL: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch event details for editing if eventId is provided
  useEffect(() => {
    if (eventId) {
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
    } else {
      setLoading(false);
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSpeakerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSpeakers = [...event.speakers];
    updatedSpeakers[index][name] = value;
    setEvent((prevEvent) => ({
      ...prevEvent,
      speakers: updatedSpeakers,
    }));
  };

  const handleAddSpeaker = () => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      speakers: [...prevEvent.speakers, { name: '', bio: '', topic: '' }],
    }));
  };

  const handleRemoveSpeaker = (index) => {
    const updatedSpeakers = event.speakers.filter((_, i) => i !== index);
    setEvent((prevEvent) => ({
      ...prevEvent,
      speakers: updatedSpeakers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (eventId) {
        // Update existing event
        await axios.put(`/api/events/${eventId}`, event);
      } else {
        // Create new event
        await axios.post('/api/events', event);
      }
      navigate('/'); // Redirect to the event list or any other page after submission
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">{eventId ? 'Edit Event' : 'Create Event'}</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Event Name</label>
        <input
          type="text"
          name="name"
          value={event.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="datetime-local"
          name="date"
          value={event.date.slice(0, 16)} // Format for input
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Venue</label>
        <input
          type="text"
          name="venue"
          value={event.venue}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Tickets Available</label>
        <input
          type="number"
          name="ticketsAvailable"
          value={event.ticketsAvailable}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="url"
          name="imageURL"
          value={event.imageURL}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Speakers</h2>
      {event.speakers.map((speaker, index) => (
        <div key={index} className="mb-4 border p-4 rounded">
          <div className="flex justify-between mb-2">
            <label className="block text-gray-700">Speaker Name</label>
            <button
              type="button"
              onClick={() => handleRemoveSpeaker(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            name="name"
            value={speaker.name}
            onChange={(e) => handleSpeakerChange(index, e)}
            required
            className="mt-1 p-2 border rounded w-full"
          />
          <div className="mb-2">
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={speaker.bio}
              onChange={(e) => handleSpeakerChange(index, e)}
              required
              className="mt-1 p-2 border rounded w-full"
            ></textarea>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Topic</label>
            <input
              type="text"
              name="topic"
              value={speaker.topic}
              onChange={(e) => handleSpeakerChange(index, e)}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddSpeaker}
        className="mb-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Add Speaker
      </button>

      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        {eventId ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
