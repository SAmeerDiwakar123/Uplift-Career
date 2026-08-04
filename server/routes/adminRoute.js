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
  getAllCompaniesAdmin,
  deleteCompanyAdmin,  
} from "../controllers/adminController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

// Auth & Stats
router.route("/login").post(adminLogin);
router.route("/stats").get(isAdmin, getAdminStats);

// Users Management
router.route("/users").get(isAdmin, getAllUsers);
router.route("/users/ban/:id").put(isAdmin, banUser);

// Jobs Management
router.route("/jobs").get(isAdmin, getAllJobsAdmin);
router.route("/jobs/delete/:id").delete(isAdmin, deleteJobAdmin);

// Companies Management (NEWLY ADDED)
router.route("/companies").get(isAdmin, getAllCompaniesAdmin);
router.route("/companies/delete/:id").delete(isAdmin, deleteCompanyAdmin);

// Courses & Revenue
router.route("/courses").get(isAdmin, getAllCoursesAdmin);
router.route("/revenue").get(isAdmin, getRevenue);

export default router;