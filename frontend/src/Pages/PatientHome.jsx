import { useEffect, useState } from "react";
import API from "../Utils/axios";

const PatientHome = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const patientId = localStorage.getItem("id");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await API.post("/patient/profile", { patientId });
        setPatient(res.data);
      } catch (err) {
        console.error("Failed to fetch patient data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (loading)
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading Home page...</p>
      </div>
    );

  return (
    <div className="doctor-home">
      <section className="hero-section">
        <div className="hero-content">
          <div>
            <h1>Welcome, {patient?.username}</h1>
            <p>
              Explore top doctors, manage your appointments, and take charge of
              your health with DocNow.
            </p>
          </div>
          <img src="/2.jpg" alt="picture" className="hero-image" />
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card blue">
          <h3>Your total Appointments</h3>
          <p>{patient?.totalAppointments || 0}</p>
        </div>
      </section>

      <section className="features-section">
        <h2>What You Can Do with Us</h2>
        <ul>
          <li>Book appointments with top-rated doctors</li>
          <li>Track your appointment history and status</li>
          <li>Get timely notifications and reminders</li>
          <li>View doctor profiles and reviews</li>
          <li>Manage your health journey securely</li>
        </ul>
      </section>
    </div>
  );
};

export default PatientHome;
