import { Course } from "../models/CourseModel.js"
import { Enrollment } from "../models/EnrolledModel.js"
import { Order } from "../models/OrderModel.js"
import razorpayInstance from "../utils/razorpay.js";
import crypto from "crypto";
import { addYears } from "date-fns";

const createOrder = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    //Course exist?
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ success: false, message: "Course not found" })
    }

    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
      status: "active",
    })

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      })
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    const order = await Order.create({
      user: userId,
      course: courseId,
      amount: course.price,
      razorpay_order_id: razorpayOrder.id,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      order: razorpayOrder,
      dbOrder: order,
      course: {
        name: course.title,
        price: course.price,
      },
      key: process.env.RAZORPAY_KEY_ID,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
}

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const { courseId } = req.params;
    const userId = req.id;

    // Signature verify karo (security check)
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature - Payment failed",
      });
    }

    // Order status update karo
    await Order.findOneAndUpdate(
      { razorpay_order_id },
      {
        razorpay_payment_id,
        razorpay_signature,
        status: "completed",
      }
    );

    // Enrollment create karo
    const course = await Course.findById(courseId);
    const expiresAt = addYears(new Date(), course.validityYears);

    await Enrollment.create({
      user: userId,
      course: courseId,
      expiresAt,
    });

    // enrolledStudents mein add karo
    await Course.findByIdAndUpdate(courseId, {
      $push: { enrolledStudents: userId },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified! Enrollment successful 🎉",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

export { createOrder, verifyPayment};