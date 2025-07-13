import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./Pages/Login";
import DoctorHome from "./Pages/DoctorHome";
import DoctorProfile from "./Pages/DoctorProfile";
import PatientHome from "./Pages/PatientHome";
import PatientBookDoc from "./Pages/PatientBookDoc";
import Notifications from "./Pages/Notifications";
import Appointments from "./Pages/Appointments";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import API from "./Utils/axios";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAuthenticated = async () => {
    if (!token) return false;
    try {
      const res = await API.get("/auth/verify", {
        headers: {
          Authorization: token,
        },
      });
      return res.data.valid;
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
      console.error("Token verification failed:", err);
      return false;
    }
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    const [allowed, setAllowed] = useState(null);

    useEffect(() => {
      const checkAuth = async () => {
        const result = await isAuthenticated();
        if (result && allowedRoles.includes(role)) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      };
      checkAuth();
    }, [allowedRoles]);

    if (allowed === null) {
      return (
        <div className="loading-screen">
          <div className="spinner" />
          <p>Checking authentication...</p>
        </div>
      );
    }

    return allowed ? (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate
              to={role === "doctor" ? "/doctor/home" : "/patient/home"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor/home"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorProfile />
          </ProtectedRoute>
        }
      />

      {/* Patient Routes */}
      <Route
        path="/patient/home"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/bookDoc"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientBookDoc />
          </ProtectedRoute>
        }
      />

      {/* Comman Routes */}
      <Route
        path="/appointments"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor"]}>
            <Appointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute allowedRoles={["patient", "doctor"]}>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
