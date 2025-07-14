import express from 'express';
import {
  getPatientProfile,
} from '../controllers/patientController.js';

const router = express.Router();

router.post('/profile', getPatientProfile);

export default router;