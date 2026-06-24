import express from "express";
import { createOrder, verifyPayment } from "../controllers/orderController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/:courseId/create-order").post(isAuthenticated, createOrder);
router.route("/:courseId/verify-payment").post(isAuthenticated, verifyPayment);

export default router;