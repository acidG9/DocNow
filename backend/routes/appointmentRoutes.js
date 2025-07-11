import express from 'express';
import {
  bookAppointment,
  getAvailableSlots,
  getUpcomingAppointments,
  getAppointmentHistory,
  cancelAppointment,
  getDoctorsBySpeciality
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/book', bookAppointment);
router.post('/slots', getAvailableSlots);
router.post('/upcoming', getUpcomingAppointments);
router.post('/history', getAppointmentHistory);
router.delete('/cancel/:appointmentId', cancelAppointment);
router.post('/doctors-by-speciality', getDoctorsBySpeciality);

export default router;
