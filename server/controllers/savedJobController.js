import { SavedJob } from "../models/SavedJobModel.js";
import { SavedInternship } from "../models/SavedInternshipModel.js";

// Save Job
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.id;

    const existing = await SavedJob.findOne({ user: userId, job: jobId });
    if (existing) {
      await SavedJob.findByIdAndDelete(existing._id);
      return res.status(200).json({
        success: true,
        message: "Job unsaved",
        saved: false,
      });
    }

    await SavedJob.create({ user: userId, job: jobId });
    return res.status(201).json({
      success: true,
      message: "Job saved",
      saved: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

// Get Saved Jobs
const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ user: req.id })
      .populate({
        path: "job",
        populate: { path: "company" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      savedJobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

// Save Internship
const saveInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;
    const userId = req.id;

    const existing = await SavedInternship.findOne({
      user: userId,
      internship: internshipId,
    });

    if (existing) {
      await SavedInternship.findByIdAndDelete(existing._id);
      return res.status(200).json({
        success: true,
        message: "Internship unsaved",
        saved: false,
      });
    }

    await SavedInternship.create({ user: userId, internship: internshipId });
    return res.status(201).json({
      success: true,
      message: "Internship saved",
      saved: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

// Get Saved Internships
const getSavedInternships = async (req, res) => {
  try {
    const savedInternships = await SavedInternship.find({ user: req.id })
      .populate({
        path: "internship",
        populate: { path: "company" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      savedInternships,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};
export {saveJob, getSavedJobs, saveInternship,getSavedInternships}