import express from 'express';
import { registerUser, loginUser, logout, updateProfile } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';


const router = express.Router();

router.route("/register").post(singleUpload,registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
export default router;