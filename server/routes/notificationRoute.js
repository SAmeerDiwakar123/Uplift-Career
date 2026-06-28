import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/get").get(isAuthenticated, getNotifications);
router.route("/read/:id").put(isAuthenticated, markAsRead);
router.route("/read-all").put(isAuthenticated, markAllAsRead);
router.route("/delete/:id").delete(isAuthenticated, deleteNotification);

export default router;