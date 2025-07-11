import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

// Time slots from 1 to 5 PM
const getAllSlots = () => ['13:00', '14:00', '15:00', '16:00', '17:00'];

// Book appointment
export const bookAppointment = async (req, res) => {
  const { patientId, doctorId, date, time } = req.body;

  try {
    // Check if already booked
    const existing = await Appointment.findOne({ doctor: doctorId, date, time });
    if (existing) return res.status(400).json({ msg: 'Slot already booked' });

    // Create appointment
    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      time
    });

    // Update doctor's earnings
    const doctor = await Doctor.findById(doctorId);
    doctor.earning += doctor.fees;
    doctor.notifications.push(`New appointment booked on ${date} at ${time}`);
    await doctor.save();

    // Notify patient
    const patient = await Patient.findById(patientId);
    patient.notifications.push(`Appointment booked with Dr. ${doctor.username} on ${date} at ${time}`);
    await patient.save();

    res.status(201).json({ msg: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get doctors by speciality
export const getDoctorsBySpeciality = async (req, res) => {
  const { speciality } = req.body;

  try {
    if (!speciality) return res.status(400).json({ msg: 'Speciality is required' });

    const doctors = await Doctor.find({ speciality }).select('-password');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};


// Get available time slots for doctor on date
export const getAvailableSlots = async (req, res) => {
  const { doctorId, date } = req.body;

  try {
    const appointments = await Appointment.find({ doctor: doctorId, date });
    const booked = appointments.map(a => a.time);
    const available = getAllSlots().filter(slot => !booked.includes(slot));

    res.json({ available });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get upcoming appointments
export const getUpcomingAppointments = async (req, res) => {
  const { role, userId } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const filter = role === 'doctor' ? { doctor: userId } : { patient: userId };
    const upcoming = await Appointment.find({ ...filter, date: { $gte: today } })
      .populate('doctor', 'username speciality')
      .populate('patient', 'username');

    res.json({ upcoming });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get past appointments
export const getAppointmentHistory = async (req, res) => {
  const { role, userId } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const filter = role === 'doctor' ? { doctor: userId } : { patient: userId };
    const history = await Appointment.find({ ...filter, date: { $lt: today } })
      .populate('doctor', 'username speciality')
      .populate('patient', 'username');

    res.json({ history });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Cancel appointment (doctor)
export const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId).populate('doctor').populate('patient');
    if (!appointment) return res.status(404).json({ msg: 'Not found' });

    // Refund fee
    const doctor = await Doctor.findById(appointment.doctor._id);
    doctor.earning -= doctor.fees;
    doctor.notifications.push(`Appointment on ${appointment.date} at ${appointment.time} was cancelled`);
    await doctor.save();

    const patient = await Patient.findById(appointment.patient._id);
    patient.notifications.push(`Your appointment on ${appointment.date} at ${appointment.time} was cancelled by the doctor`);
    await patient.save();

    await Appointment.findByIdAndDelete(appointmentId);
    res.json({ msg: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
