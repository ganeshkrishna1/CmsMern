import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import EventDetail from "./pages/events/EventDetail";
import EventList from "./pages/events/EventList";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import EventForm from "./components/events/EventForm";
import ForgotPassword from "./components/forgot-password/ForgotPassword";
import OtpVerification from "./components/forgot-password/OtpVerification";
import UpdatePassword from "./components/forgot-password/UpdatePassword";
import Sidebar from "./components/sidebar/Sidebar";
import { getUserInfo, getUserRole } from "./services/localStorageInfo";
import AttendeeManagement from "./pages/events/AttendeeManagement";
import AllUsers from "./pages/users/AllUsers";
import Dashboard from "./components/dashboard/Dashboard";
import MyEvents from "./components/events/MyEvents";
import Notifications from "./components/notifications/Notifications";
import AllUsersProtectedRoute from "./components/protectedroute/AllUsersProtectedRoute";
import NotFound from "./pages/notfoundpage/NotFound";


function App() {
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!getUserInfo()) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
      
      {getUserInfo() && (
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar role={getUserRole()} />
          {/* Main Content */}
          <div className="flex-1 p-2">
            <Routes>
              <Route path="/all-users" element={<AllUsersProtectedRoute />} > 
              <Route path="events" element={<EventList />} /> 
              <Route path="events/:eventId" element={<EventDetail />} /> 
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="users" element={<AllUsers />} /> 
              
              <Route path="events/new" element={<EventForm />} />
              <Route path="events/edit/:eventId" element={<EventForm />} /> 
              
              <Route path="attendee-management" element={<AttendeeManagement />} /> 
              
              <Route path="myevents" element={<MyEvents />} />
              </Route>
              
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
