import { Course } from "../models/CourseModel.js";
import { Enrollment } from "../models/EnrolledModel.js";
import { addYears } from "date-fns";

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // Course Exist ?
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      })
    }

    // Phele se Enrolled hai?
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId
    })
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }

    const expiresAt = addYears(new Date(), course.validityYears);

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      expiresAt,
    })

    await Course.findByIdAndUpdate(courseId, {
      $push: { enrolledStudents: userId },
    })
    return res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      enrollment,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to enroll",
    });
  }
}


const getMyEnrollments = async (req, res) => {
  try {
    const userId = req.id;

    const enrollments = await Enrollment.find({ user: userId }).populate({
      path: "course",
      populate: {
        path: "instructor",
        select: "fullname email",
      },
    }).sort({ enrolledAt: -1 });

    return res.status(200).json({
      success: true,
      enrollments,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to enroll",
    });
  }
}

const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
      status: "active",
    });

    return res.status(200).json({
      success: true,
      isEnrolled: !!enrollment,
      enrollment: enrollment || null,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to enroll",
    });
  }
}

const expireEnrollments = async (req, res) => {
  try {
    const now = new Date();

    // Jo enrollments expire ho gayi hain unka status update karo
    const result = await Enrollment.updateMany(
      { expiresAt: { $lt: now }, status: "active" },
      { status: "expired" }
    );

    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} enrollments expired`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to expire enrollments",
    });
  }
};

export {enrollCourse, getMyEnrollments, checkEnrollment, expireEnrollments}