import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import EventDetail from './pages/EventDetail';
import EventList from './pages/EventList';
import EventForm from '../components/events/EVentForm';

function App() {
  const [count, setCount] = useState(0);

  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventList />} /> {/* List of events */}
          <Route path="/events/new" element={<EventForm />} /> {/* Create new event */}
          <Route path="/events/edit/:id" element={<EventForm />} /> {/* Edit existing event */}
          <Route path="/events/:id" element={<EventDetail />} /> {/* Event details */}
        </Routes>
  );
}

export default App;
