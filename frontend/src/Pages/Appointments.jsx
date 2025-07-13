import { useEffect, useState } from "react";
import API from "../Utils/axios";

const PatientAppointment = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const [upcomingRes, historyRes] = await Promise.all([
          API.post("/appointments/upcoming", { userId, role }),
          API.post("/appointments/history", { userId, role }),
        ]);

        setUpcoming(upcomingRes.data.upcoming || []);
        setHistory(historyRes.data.history || []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId, role]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading Appointments...</p>
      </div>
    );
  }

  return (
    <div className="appointment-page">
      <h2>Upcoming Appointments</h2>
      {upcoming.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul className="appointment-list">
          {upcoming.map((a) => (
            <li key={a._id}>
              <span className="upcoming-indicator">Upcoming</span>
              <strong>Date:</strong> {a.date} | <strong>Time:</strong> {a.time}{" "}
              | <strong>{role === "doctor" ? "Patient" : "Doctor"}:</strong>{" "}
              {role === "doctor" ? a.patient.username : a.doctor.username}
              {role === "patient" && (
                <>
                  {" "}
                  (<em>{a.doctor.speciality}</em>)
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2>Appointment History</h2>
      {history.length === 0 ? (
        <p>No past appointments.</p>
      ) : (
        <ul className="appointment-list">
          {history.map((a) => (
            <li key={a._id}>
              <span className="history-indicator">Completed</span>
              <strong>Date:</strong> {a.date} | <strong>Time:</strong> {a.time}{" "}
              | <strong>{role === "doctor" ? "Patient" : "Doctor"}:</strong>{" "}
              {role === "doctor" ? a.patient.username : a.doctor.username}
              {role === "patient" && (
                <>
                  {" "}
                  (<em>{a.doctor.speciality}</em>)
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientAppointment;
