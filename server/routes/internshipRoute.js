import express from "express";
import { createInternship,getAllInternship,getInternshipById,updatedInternship,deleteInternship,applyInternship,getInternshipApplicants,changeInternshipStatus} from "../controllers/internshipController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.route("/create").post(isAuthenticated, createInternship);
router.route("/get").get(getAllInternship);
router.route("/get/:id").get(getInternshipById);
router.route("/update/:id").put(isAuthenticated, updatedInternship);
router.route("/delete/:id").delete(isAuthenticated, deleteInternship);
router.route("/:id/apply").post(isAuthenticated, applyInternship);
router.route("/:id/applicants").get(isAuthenticated, getInternshipApplicants);
router.route("/:id/status").patch(isAuthenticated, changeInternshipStatus);
export default router;