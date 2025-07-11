import express from 'express';
import {
  getNotifications,
  clearNotification
} from '../controllers/notificationController.js';

const router = express.Router();
router.post('/', getNotifications);
router.put('/clear', clearNotification);

export default router;
