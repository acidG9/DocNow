import { useState } from "react";
import API from "../Utils/axios";

const PatientBookDoc = () => {
  const [date, setDate] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const patientId = localStorage.getItem("id");

  const showToast = (message, success = true) => {
    const toast = document.createElement("div");
    toast.className = `toast ${success ? "success" : "error"}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleFetchDoctors = async () => {
    if (!speciality || !date)
      return showToast("Date and Speciality required", false);
    setLoading(true);
    try {
      const res = await API.post("/appointments/doctors-by-speciality", {
        speciality,
      });
      setDoctors(res.data);
    } catch (err) {
      showToast("Failed to fetch doctors", false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCalendar = async (doctorId) => {
    setLoading(true);
    try {
      const res = await API.post("/appointments/slots", { doctorId, date });
      setSlots(res.data.available);
    } catch {
      showToast("Could not fetch slots", false);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    if (!selectedSlot) return showToast("Select a slot", false);
    setLoading(true);
    try {
      await API.post("/appointments/book", {
        patientId,
        doctorId: selectedDoc._id,
        date,
        time: selectedSlot,
      });
      showToast("Appointment Booked!");
    } catch (err) {
      showToast("Booking Failed", false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-book-doc">
      <h2>Book an Appointment</h2>

      <div className="form-row">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Doctor Speciality:</label>
        <select
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        >
          <option value="">Select</option>
          {[
            "General Physician",
            "Pediatrician",
            "Gynecologist",
            "Orthopedic",
            "Psychiatrist",
            "Cardiologist",
            "Radiologist",
            "Pathologist",
            "Surgeon",
            "Neurosurgeon",
            "Pediatric Surgeon",
            "Dentist",
            "Ayurveda Specialist",
            "Homeopathy Doctor",
            "Physiotherapist",
            "Sexologist",
          ].map((sp) => (
            <option key={sp} value={sp}>
              {sp}
            </option>
          ))}
        </select>
      </div>

      <button className="submit-btn" onClick={handleFetchDoctors}>
        Find Doctors
      </button>

      {loading && (
        <div className="loader-container">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      )}

      <div className="doctor-list">
        {doctors.map((doc) => (
          <div key={doc._id} className="doctor-card">
            <h3>{doc.username}</h3>
            <p>Fees: ₹{doc.fees}</p>
            <p>Experience: {doc.experience} yrs</p>
            <button
              onClick={() => {
                setSelectedDoc(doc);
                setSlots([]);
              }}
            >
              Select
            </button>
          </div>
        ))}
      </div>

      {selectedDoc && (
        <div className="selected-doctor">
          <h3>Dr. {selectedDoc.username}</h3>
          <p>{selectedDoc.summary}</p>
          <p>Speciality: {selectedDoc.speciality}</p>
          <p>Experience: {selectedDoc.experience} years</p>
          <p>College: {selectedDoc.college}</p>
          <p>Fees: ₹{selectedDoc.fees}</p>
          <button
            className="calendar-btn"
            onClick={() => handleViewCalendar(selectedDoc._id)}
          >
            View Dr. Calendar
          </button>

          {slots.length > 0 && (
            <div className="slot-container">
              <h4>Available Slots</h4>
              <div className="slots-grid">
                {["13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
                  <button
                    key={time}
                    disabled={!slots.includes(time)}
                    className={`slot-btn ${
                      selectedSlot === time ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSlot(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button className="submit-btn" onClick={handleBook}>
                Book
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientBookDoc;
