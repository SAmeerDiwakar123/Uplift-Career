import express from "express";
import {
  adminLogin,
  getAdminStats,
  getAllUsers,
  banUser,
  getAllJobsAdmin,
  deleteJobAdmin,
  getAllCoursesAdmin,
  getRevenue,
} from "../controllers/adminController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.route("/login").post(adminLogin);
router.route("/stats").get(isAdmin, getAdminStats);
router.route("/users").get(isAdmin, getAllUsers);
router.route("/users/ban/:id").put(isAdmin, banUser);
router.route("/jobs").get(isAdmin, getAllJobsAdmin);
router.route("/jobs/delete/:id").delete(isAdmin, deleteJobAdmin);
router.route("/courses").get(isAdmin, getAllCoursesAdmin);
router.route("/revenue").get(isAdmin, getRevenue);

export default router;