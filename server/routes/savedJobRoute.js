import express from "express";
import {
  saveJob,
  getSavedJobs,
  saveInternship,
  getSavedInternships,
} from "../controllers/savedJobController.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/job/:jobId").post(isAuthenticated, saveJob);
router.route("/jobs").get(isAuthenticated, getSavedJobs);
router.route("/internship/:internshipId").post(isAuthenticated, saveInternship);
router.route("/internships").get(isAuthenticated, getSavedInternships);

export default router;