import express from 'express';
import {
  getDoctorProfile,
  updateDoctorProfile,
} from '../controllers/doctorController.js';

const router = express.Router();

router.post('/profile', getDoctorProfile);
router.put('/profile', updateDoctorProfile);

export default router;
