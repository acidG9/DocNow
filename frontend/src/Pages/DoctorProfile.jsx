import { useEffect, useState } from "react";
import API from "../Utils/axios";

const DoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const doctorId = localStorage.getItem("id");

  const showToast = (message, success = true) => {
    const toast = document.createElement("div");
    toast.className = `toast ${success ? "success" : "error"}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.post("/doctor/profile", { doctorId });
        setProfile(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditToggle = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
  };

  const handleSave = async () => {
    setUpdating(true);
    try {
      const res = await API.put("/doctor/profile", {
        doctorId,
        ...formData,
      });
      setProfile(res.data.doctor);
      setEditing(false);
      showToast("Profile updated successfully!", true);
    } catch (err) {
      console.error("Error updating profile:", err);
      showToast("Failed to update profile", false);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading Profile...</p>
      </div>
    );

  return (
    <div className="profile-page">
      <h2>Doctor Profile</h2>

      <div className="profile-section">
        <label>Username:</label>
        <p>{profile.username}</p>
      </div>

      <div className="profile-section">
        <label>Speciality:</label>
        {editing ? (
          <select
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
          >
            <option value="General Physician">General Physician</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Radiologist">Radiologist</option>
            <option value="Pathologist">Pathologist</option>
            <option value="Surgeon">Surgeon</option>
            <option value="Neurosurgeon">Neurosurgeon</option>
            <option value="Pediatric Surgeon">Pediatric Surgeon</option>
            <option value="Dentist">Dentist</option>
            <option value="Ayurveda Specialist">Ayurveda Specialist</option>
            <option value="Homeopathy Doctor">Homeopathy Doctor</option>
            <option value="Physiotherapist">Physiotherapist</option>
            <option value="Sexologist">Sexologist</option>
          </select>
        ) : (
          <p>{profile.speciality}</p>
        )}
      </div>

      <div className="profile-section">
        <label>Experience (years):</label>
        {editing ? (
          <input
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.experience}</p>
        )}
      </div>

      <div className="profile-section">
        <label>College:</label>
        {editing ? (
          <input
            name="college"
            value={formData.college}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.college}</p>
        )}
      </div>

      <div className="profile-section">
        <label>Summary:</label>
        {editing ? (
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={3}
          />
        ) : (
          <p>{profile.summary}</p>
        )}
      </div>

      <div className="profile-section">
        <label>Fees (₹):</label>
        {editing ? (
          <input
            name="fees"
            type="number"
            value={formData.fees}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.fees}</p>
        )}
      </div>

      <div className="profile-buttons">
        {!editing ? (
          <button onClick={handleEditToggle}>Edit Profile</button>
        ) : (
          <>
            <button onClick={handleSave} disabled={updating}>
              {updating ? "Saving..." : "Save"}
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
