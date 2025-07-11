import express from 'express';
import {
  getDoctorProfile,
  updateDoctorProfile,
  getEarnings
} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/:id', getDoctorProfile);
router.put('/:id', updateDoctorProfile);
router.get('/:id/earnings', getEarnings);

export default router;
