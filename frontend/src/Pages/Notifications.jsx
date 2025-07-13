import { useEffect, useState } from "react";
import API from "../Utils/axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("id");

  const clearNotification = async (index) => {
    try {
      await API.put("/notifications/clear", { role, userId, index });
      setNotifications((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error clearing notification:", err);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await API.post("/notifications/find", { role, userId });
        const arr = res.data.notifications || [];
        setNotifications(arr);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [role, userId]);

  return (
    <div className="notifications-page">
      <h2>Your Notifications</h2>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : notifications.length === 0 ? (
        <p className="no-notifications">You're all caught up!</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((note, index) => (
            <li key={index} className="notification-item">
              <div className="notification-message">{note}</div>
              <div className="notification-actions">
                <button onClick={() => clearNotification(index)}>Clear</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
