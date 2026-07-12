import { Internship } from "../models/InternshipModel.js";
import { InternshipApplication } from "../models/InternshipApplicationModel.js";
import { Notification } from "../models/NotificationModel.js";

// 1. Post Internship (Recruiter)
export const postInternship = async (req, res) => {
  try {
    const {
      title, description, location, isRemote, stipend, duration, openings, skills, applyBy, category,
      isPPO, company, } = req.body;

    if (!title || !description || !location || !duration) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const internship = await Internship.create({
      title,
      description,
      company,
      location,
      isRemote,
      stipend,
      duration,
      openings,
      skills: skills ? skills.split(",").map(s => s.trim()) : [],
      applyBy,
      category,
      isPPO,
      postedBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Internship posted successfully",
      internship,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to post internship",
    });
  }
};

// 2. Get All Internships (Public)
export const getAllInternships = async (req, res) => {
  try {
    const { keyword, location, category, isRemote, minStipend } = req.query;

    const query = { isActive: true };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) query.location = { $regex: location, $options: "i" };
    if (category) query.category = category;
    if (isRemote) query.isRemote = isRemote === "true";
    if (minStipend) query.stipend = { $gte: Number(minStipend) };

    const internships = await Internship.find(query)
      .populate("company")
      .populate("postedBy", "fullname email")
      .populate("applications") 
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      internships,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
    });
  }
};

// 3. Get Internship By ID
export const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;

    const internship = await Internship.findById(id)
      .populate("company")
      .populate("postedBy", "fullname email")
      .populate("applications");
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    return res.status(200).json({
      success: true,
      internship,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch internship",
    });
  }
};

// 4. Apply Internship (Student)
export const applyInternship = async (req, res) => {
  try {
    const { id: internshipId } = req.params;
    const userId = req.id;

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Pehle se apply kiya?
    const existing = await InternshipApplication.findOne({
      internship: internshipId,
      applicant: userId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already applied",
      });
    }

    const application = await InternshipApplication.create({
      internship: internshipId,
      applicant: userId,
    });

    // Internship mein add karo
    internship.applications.push(application._id);
    await internship.save();

    // Notification bhejo
    await Notification.create({
      user: userId,
      title: "Application Submitted!",
      message: `You applied for ${internship.title}`,
      type: "internship",
    });

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to apply",
    });
  }
};

// 5. Get My Applied Internships (Student)
export const getMyInternshipApplications = async (req, res) => {
  try {
    const applications = await InternshipApplication.find({
      applicant: req.id,
    })
      .populate({
        path: "internship",
        populate: { path: "company" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

// 6. Update Internship (Recruiter)
export const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const internship = await Internship.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Internship updated",
      internship,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

// 7. Delete Internship (Recruiter)
export const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    await Internship.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Internship deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// 8. Get Recruiter's Internships
export const getMyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ postedBy: req.id })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      internships,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch",
    });
  }
};

// 9. Update Application Status (Recruiter)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await InternshipApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("applicant", "fullname email");

    // Student ko notification bhejo
    await Notification.create({
      user: application.applicant._id,
      title: "Application Status Updated",
      message: `Your internship application is ${status}`,
      type: "internship",
    });

    return res.status(200).json({
      success: true,
      message: "Status updated",
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};