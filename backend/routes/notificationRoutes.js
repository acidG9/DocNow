import express from 'express';
import {
  getNotifications,
  clearNotification
} from '../controllers/notificationController.js';

const router = express.Router();
router.get('/', getNotifications);
router.put('/clear', clearNotification);

export default router;
