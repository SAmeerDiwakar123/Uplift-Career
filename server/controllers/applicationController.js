import { Application } from "../models/ApplicationModel.js";
import { Job } from "../models/JobModel.js"


const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ success: false, message: "JobId is required" });
    }

    // check user already applied or not 
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

    if (existingApplication) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" })
    }
    // create a new Application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      success: true,
      message: "Job applied successfully."
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'company',
        options: { sort: { createdAt: -1 } }
      }
    })

    if (!application) {
      return res.status(404).json({ success: false, message: "No Applications" });
    }

    return res.status(200).json({ success: true, applications: application })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


const getApplicants = async (req, res) => {
  try {
    //job id
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant',
        select: '-password'
      }
    })

    if (!job) {
      return res.status(400).json({ success: false, message: "Job not found" });
    }
    
    return res.status(200).json({
      success: true,
      job
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id

    if (!status) {
      return res.status(400).json({ success: false, message: "status is required" });
    }

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    //Update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Status updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export { applyJob, getAppliedJobs, getApplicants, updateStatus };