import { Job } from '../models/JobModel.js';

// ==========================================
// RECRUITER ROLES
// ==========================================

// 1. Post a new job (Recruiter द्वारा जॉब पोस्ट करना)
const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, position, companyId, experienceLevel } = req.body;
    const userId = req.id; // Recruiter की ID (Auth Middleware से आई हुई)

    if (!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map(r => r.trim()), // Trim भी लगा दिया ताकि एक्स्ट्रा स्पेस न रहे
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      company: companyId,
      created_by: userId
    });

    return res.status(201).json({ success: true, message: "Job posted successfully", job });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// 2. Get all jobs posted by a specific Recruiter (Recruiter को सिर्फ उसकी खुद की पोस्ट की हुई जॉब्स दिखेंगी)
const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.id; // Recruiter की ID
    const jobs = await Job.find({ created_by: recruiterId }).populate('company');

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found for this recruiter" });
    }
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// 3. Update Job (Recruiter अपनी जॉब एडिट कर सकता है)
const updateJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experienceLevel, position } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title, description,
        requirements: requirements ? requirements.split(",").map(r => r.trim()) : undefined,
        salary, location, jobType, experienceLevel, position
      },
      { new: true }
    );

    if (!updatedJob) return res.status(404).json({ success: false, message: "Job not found" });

    return res.status(200).json({ success: true, message: "Job updated!", job: updatedJob });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// ==========================================
// STUDENT ROLES (या फिर General Public)
// ==========================================

// 1. Get all jobs with filter/keyword (Student के होमपेज/जॉब सर्च के लिए)
const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    }

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .populate({ path: "applications" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    return res.status(200).json({ success: true, jobs });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// 2. Get specific job details by ID (Student जब किसी सिंगल जॉब पर क्लिक करेगा)
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate('company').populate('applications');
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// ==========================================
// ADMIN ROLES (Super Admin)
// ==========================================

// 1. Delete any job (Admin पूरे पोर्टल से किसी भी फालतू/गलत जॉब को डिलीट कर सकता है)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    return res.status(200).json({ success: true, message: "Job deleted successfully by Admin!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { postJob, getRecruiterJobs, updateJob, getAllJobs, getJobById, deleteJob };









// import { Job } from '../models/JobModel.js';


// const postJob = async (req, res) => {
//   try {
//     const { title, description, requirements, salary, location, jobType, position, companyId, experienceLevel } = req.body;

//     const userId = req.id;

//     if (!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId || !experienceLevel) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });
//     }
//     const job = await Job.create({
//       title,
//       description,
//       requirements: requirements.split(","),
//       salary: Number(salary),
//       location,
//       jobType,
//       experienceLevel,
//       position,
//       company: companyId,
//       created_by: userId
//     });

//     return res.status(201).json({ success: true, message: "Job posted successfully", job });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// }

// const getAllJobs = async (req, res) => {
//   try {
//     const keyword = req.query.keyword || "";
//     const query = {
//       $or: [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } }
//       ]
//     }

//     const jobs = await Job.find(query)
//       .populate({ path: "company" })
//       .populate({ path: "applications" })
//       .sort({ createdAt: -1 });
//     if (!jobs) {
//       return res.status(404).json({ success: false, message: "No jobs found" });
//     }

//     return res.status(200).json({ success: true, jobs });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// }

// // Student
// const getJobById = async (req, res) => {
//   try {
//     const jobId = req.params.id;

//     const job = await Job.findById(jobId).populate('company').populate('applications');
//     if (!job) {
//       return res.status(404).json({ success: false, message: "Job not found" });
//     }

//     return res.status(200).json({ success: true, job });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// }


// // For recruiter
// const getRecruiterJobs  = async (req, res) => {
//   try {
//     const adminId = req.id;
//     const jobs = await Job.find({ created_by: adminId }).populate('company');

//     if (!jobs) {
//       return res.status(404).json({ success: false, message: "No jobs found" });
//     }
//     return res.status(200).json({ success: true, jobs });
//   } catch (error) {
//     console.log(error);
//   }
// }


// const updateJob = async (req, res) => {
//   try {
//     const { title, description, requirements, salary, location, jobType, experienceLevel, position } = req.body;

//     const updatedJob = await Job.findByIdAndUpdate(
//       req.params.id,
//       {
//         title, description,
//         requirements: requirements.split(",").map(r => r.trim()),
//         salary, location, jobType, experienceLevel, position
//       },
//       { new: true }
//     );

//     if (!updatedJob) return res.status(404).json({ success: false, message: "Job not found" });

//     return res.status(200).json({ success: true, message: "Job updated!", job: updatedJob });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const deleteJob = async (req, res) => {
//   try {
//     const job = await Job.findByIdAndDelete(req.params.id);
//     if (!job) return res.status(404).json({ success: false, message: "Job not found" });
//     return res.status(200).json({ success: true, message: "Job deleted!" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export { postJob, getAllJobs, getJobById, getRecruiterJobs, updateJob, deleteJob };