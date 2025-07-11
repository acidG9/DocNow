import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

export const getNotifications = async (req, res) => {
  const { role, userId } = req.body;
  try {
    const user = role === 'doctor'
      ? await Doctor.findById(userId)
      : await Patient.findById(userId);
    res.json({ notifications: user.notifications });
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching notifications' });
  }
};

export const clearNotification = async (req, res) => {
  const { role, userId, index } = req.body;
  try {
    const user = role === 'doctor'
      ? await Doctor.findById(userId)
      : await Patient.findById(userId);
    user.notifications.splice(index, 1);
    await user.save();
    res.json({ msg: 'Notification cleared' });
  } catch (err) {
    res.status(500).json({ msg: 'Error clearing notification' });
  }
};
