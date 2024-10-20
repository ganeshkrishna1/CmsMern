import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import EventDetail from './pages/EventDetail'
import EventList from './pages/EventList'
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import EventForm from "./components/events/EventForm";
import ForgotPassword from "./components/forgot-password/ForgotPassword";
import OtpVerification from "./components/forgot-password/OtpVerification";
import UpdatePassword from "./components/forgot-password/UpdatePassword";

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
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/otp-verification' element={<OtpVerification />} />
        <Route path='/update-password' element={<UpdatePassword />} />
      </Routes>
    </>
  );
}

export default App;
