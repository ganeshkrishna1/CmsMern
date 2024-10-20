import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import EventDetail from "./pages/EventDetail";
import EventList from "./pages/EventList";
import EventForm from "../components/events/EVentForm";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/new" element={<EventForm />} />
        <Route path="/events/edit/:id" element={<EventForm />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </>
  );
}

export default App;
