import { useEffect, useState } from "react";
import API from "../Utils/axios";

const DoctorHome = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const doctorId = localStorage.getItem("id");

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await API.post("/doctor/profile", { doctorId });
        setDoctor(res.data);
      } catch (err) {
        console.error("Failed to fetch doctor data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  if (loading)
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading Profile...</p>
      </div>
    );

  return (
    <div className="doctor-home">
      <section className="hero-section">
        <div className="hero-content">
          <div>
            <h1>Welcome, Dr. {doctor?.username}</h1>
            <p>
              Empower your practice with seamless appointment management,
              earnings tracking, and real-time updates.
            </p>
          </div>
          <img src="/1.jpg" alt="Doctor dashboard" className="hero-image" />
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card blue">
          <h3>Appointments</h3>
          <p>{doctor?.totalAppointments || 0}</p>
        </div>
        <div className="stat-card green">
          <h3>Earnings (₹)</h3>
          <p>{doctor?.earning || 0}</p>
        </div>
      </section>

      <section className="features-section">
        <h2>What You Can Do with Us</h2>
        <ul>
          <li>Manage upcoming and past appointments easily</li>
          <li>Track your total earnings in real-time</li>
          <li>Stay updated with patient notifications</li>
          <li>Quick and secure appointment scheduling</li>
        </ul>
      </section>
    </div>
  );
};

export default DoctorHome;
