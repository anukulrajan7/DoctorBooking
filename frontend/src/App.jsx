import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getUserFromCookie, removeUserCookie } from "./lib/cookie.js";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import DoctorDashboard from "./components/DoctorDashboard.jsx";
import PatientDashboard from "./components/PatientDashboard.jsx";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import DoctorBookingHomepage from "./pages/Home.jsx";

const socket = io(import.meta.env.VITE_BACKEND_URL);

export default function App() {
  const [user, setUser] = useState(getUserFromCookie());

  useEffect(() => {
    if (user?.role === "Patient") {
      socket.on("doctor-status-update", (data) => {
        window.dispatchEvent(
          new CustomEvent("doctor-status-changed", { detail: data }),
        );
      });
    }
  }, [user]);

  const handleLogout = () => {
    removeUserCookie();
    setUser(null);
  };

  return (
    <Router>
      <Header></Header>

      <div className="min-h-screen bg-gray-50 p-4">
        <Routes>
          <Route path="/" element={<DoctorBookingHomepage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/doctor"
            element={
              user?.role === "Doctor" ? (
                <DoctorDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/patient"
            element={
              user?.role === "Patient" ? (
                <PatientDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="*"
            element={
              <Navigate
                to={
                  user?.role === "Doctor"
                    ? "/doctor"
                    : user?.role === "Patient"
                      ? "/patient"
                      : "/login"
                }
              />
            }
          />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}
