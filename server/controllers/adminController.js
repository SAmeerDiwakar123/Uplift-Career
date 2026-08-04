import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";
import { Job } from "../models/JobModel.js";
import { Course } from "../models/CourseModel.js";
import { Application } from "../models/ApplicationModel.js";
import { Order } from "../models/OrderModel.js";
import { Enrollment } from "../models/EnrolledModel.js";
import { Company } from "../models/CompanyModel.js";

// 1. Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id: "admin", role: "admin", email },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: "Admin logged in successfully",
          token,
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. Admin Logout
export const adminLogout = async (req, res) => {
  try {
    return res
      .cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. Dashboard Stats
export const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalRecruiters,
      totalTeachers,
      totalJobs,
      totalCourses,
      totalApplications,
      totalEnrollments,
      totalCompanies,
      orders,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "recruiter" }),
      User.countDocuments({ role: "teacher" }),
      Job.countDocuments(),
      Course.countDocuments(),
      Application.countDocuments(),
      Enrollment.countDocuments(),
      Company.countDocuments(),
      Order.find({ status: "completed" }),
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const platformRevenue = totalRevenue * 0.40;

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalStudents,
        totalRecruiters,
        totalTeachers,
        totalJobs,
        totalCourses,
        totalApplications,
        totalEnrollments,
        totalCompanies,
        totalRevenue,
        platformRevenue,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};

// 4. All Users
export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const query = role ? { role } : {};

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// 5. Ban/Unban User
export const banUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isBanned = !user.isBanned;
    await user.save();

    return res.status(200).json({
      success: true,
      message: user.isBanned ? "User banned" : "User unbanned",
      isBanned: user.isBanned,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to ban user",
    });
  }
};

// 6. All Jobs
export const getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company")
      .populate("created_by", "fullname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

// 7. Delete Job (Admin)
export const deleteJobAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete job",
    });
  }
};

// 8. All Companies
export const getAllCompaniesAdmin = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("userId", "fullname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
    });
  }
};

// 9. Delete Company (Admin)
export const deleteCompanyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete company",
    });
  }
};

// 10. All Courses
export const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "fullname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

// 11. Revenue Details
export const getRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ status: "completed" })
      .populate("user", "fullname email")
      .populate("course", "title price")
      .sort({ createdAt: -1 });

    const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const platformRevenue = totalRevenue * 0.40;
    const teacherRevenue = totalRevenue * 0.60;

    return res.status(200).json({
      success: true,
      revenue: {
        totalRevenue,
        platformRevenue,
        teacherRevenue,
        totalOrders: orders.length,
        orders,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch revenue",
    });
  }
};










// import jwt from "jsonwebtoken";
// import { User } from "../models/UserModel.js";
// import { Job } from "../models/JobModel.js";
// import { Course } from "../models/CourseModel.js";
// import { Application } from "../models/ApplicationModel.js";
// import { Order } from "../models/OrderModel.js";
// import { Enrollment } from "../models/EnrolledModel.js";

// // Admin Login
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: "admin", role: "admin", email },
//       process.env.SECRET_KEY,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     return res.json({ success: true, message: "Admin logged in successfully", token });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Admin Logout
// export const adminLogout = async (req, res) => {
//   try {
//     res.cookie("token", "", { httpOnly: true, secure: true, sameSite: "none", maxAge: 0 });
//     return res.json({ success: true, message: "Logged out successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Dashboard Stats
// export const getAdminStats = async (req, res) => {
//   try {
//     const totalUsers        = await User.countDocuments();
//     const totalStudents     = await User.countDocuments({ role: "student" });
//     const totalRecruiters   = await User.countDocuments({ role: "recruiter" });
//     const totalTeachers     = await User.countDocuments({ role: "teacher" });
//     const totalJobs         = await Job.countDocuments();
//     const totalCourses      = await Course.countDocuments();
//     const totalApplications = await Application.countDocuments();
//     const totalEnrollments  = await Enrollment.countDocuments();
//     const orders            = await Order.find({ status: "completed" });
    
//     const totalRevenue    = orders.reduce((sum, o) => sum + o.amount, 0);
//     const platformRevenue = totalRevenue * 0.40;

//     return res.status(200).json({
//       success: true,
//       stats: {
//         totalUsers,
//         totalStudents,
//         totalRecruiters,
//         totalTeachers,
//         totalJobs,
//         totalCourses,
//         totalApplications,
//         totalEnrollments,
//         totalRevenue,
//         platformRevenue,
//       },
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Failed to fetch stats" });
//   }
// };

// // All Users
// export const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = role ? { role } : {};

//     const users = await User.find(query).select("-password").sort({ createdAt: -1 });

//     return res.status(200).json({ success: true, users });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Failed to fetch users" });
//   }
// };

// // Ban / Unban User
// export const banUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     user.isBanned = !user.isBanned;
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: user.isBanned ? "User banned" : "User unbanned",
//       isBanned: user.isBanned,
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Failed to ban user" });
//   }
// };

// // All Jobs
// export const getAllJobsAdmin = async (req, res) => {
//   try {
//     const jobs = await Job.find()
//       .populate("company")
//       .populate("created_by", "fullname email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({ success: true, jobs });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Failed to fetch jobs" });
//   }
// };

// // Delete Job
// export const deleteJobAdmin = async (req, res) => {
//   try {
//     await Job.findByIdAndDelete(req.params.id);
//     return res.status(200).json({ success: true, message: "Job deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Failed to delete job" });
//   }
// };

// // All Courses
// export const getAllCoursesAdmin = async (req, res) => {
//   try {
//     const courses = await Course.find()
//       .populate("instructor", "fullname email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({ success: true, courses });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Failed to fetch courses" });
//   }
// };

// // Revenue Details
// export const getRevenue = async (req, res) => {
//   try {
//     const orders = await Order.find({ status: "completed" })
//       .populate("user", "fullname email")
//       .populate("course", "title price")
//       .sort({ createdAt: -1 });

//     const totalRevenue    = orders.reduce((sum, o) => sum + o.amount, 0);
//     const platformRevenue = totalRevenue * 0.40;
//     const teacherRevenue  = totalRevenue * 0.60;

//     return res.status(200).json({
//       success: true,
//       revenue: {
//         totalRevenue,
//         platformRevenue,
//         teacherRevenue,
//         totalOrders: orders.length,
//         orders,
//       },
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Failed to fetch revenue" });
//   }
// };


// export const getAllCompaniesAdmin = async (req, res) => {
//   try {
//     const companies = await Company.find()
//       .populate("userId", "fullname email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       companies,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch companies",
//     });
//   }
// };

// // Delete Company (Admin)
// export const deleteCompanyAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Company.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message: "Company deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete company",
//     });
//   }
// };