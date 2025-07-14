import { useEffect, useState } from "react";
import API from "../Utils/axios";

const DoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const doctorId = localStorage.getItem("id");

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
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
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
          <input
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
          />
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
