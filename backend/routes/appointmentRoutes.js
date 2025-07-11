import express from 'express';
import {
  bookAppointment,
  getAvailableSlots,
  getUpcomingAppointments,
  getAppointmentHistory,
  cancelAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/book', bookAppointment);
router.get('/slots', getAvailableSlots);
router.get('/upcoming', getUpcomingAppointments);
router.get('/history', getAppointmentHistory);
router.delete('/cancel/:appointmentId', cancelAppointment);

export default router;
