import express from "express"
import { enrollCourse, getMyEnrollments, checkEnrollment, expireEnrollments } from "../controllers/enrollmentController.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/:courseId/enroll").post(isAuthenticated, enrollCourse);
router.route("/my-enrollments").get(isAuthenticated, getMyEnrollments);
router.route("/:courseId/check").get(isAuthenticated, checkEnrollment);

router.route("/expire").post(isAuthenticated, expireEnrollments);

export default router;