import express from "express";
import {
  postInternship,
  getAllInternships,
  getInternshipById,
  applyInternship,
  getMyInternshipApplications,
  updateInternship,
  deleteInternship,
  getMyInternships,
  updateApplicationStatus,
} from "../controllers/internshipController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public
router.route("/get").get(getAllInternships);
router.route("/get/:id").get(getInternshipById);

// Student
router.route("/apply/:id").post(isAuthenticated, applyInternship);
router.route("/my-applications").get(isAuthenticated, getMyInternshipApplications);

// Recruiter
router.route("/post").post(isAuthenticated, postInternship);
router.route("/my-internships").get(isAuthenticated, getMyInternships);
router.route("/update/:id").put(isAuthenticated, updateInternship);
router.route("/delete/:id").delete(isAuthenticated, deleteInternship);
router.route("/application/status/:id").put(isAuthenticated, updateApplicationStatus);

export default router;