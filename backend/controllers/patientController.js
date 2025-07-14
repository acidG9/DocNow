import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';

// GET patient profile
export const getPatientProfile = async (req, res) => {
  const { patientId } = req.body;

  try {
    const patient = await Patient.findById(patientId).select('-password');
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    const totalAppointments = await Appointment.countDocuments({ patient: patientId });

    res.json({ ...patient.toObject(), totalAppointments });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};