import express from 'express';
import { postJob, getAllJobs, getJobById, getAdminJobs, updateJob, deleteJob } from '../controllers/jobController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs)
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(isAuthenticated, updateJob);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);

export default router;