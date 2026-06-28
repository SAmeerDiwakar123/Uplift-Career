import { Internship } from "../models/InternshipModel.js"


const createInternship = async (req, res) => {
  try {
    const { title, companyName, description, skillsRequired, internshipType,duration, stipend, mode, location, openings,
    } = req.body;

    const userId = req.id;

    if (!title || !companyName || !description || !duration) {
      return res.status(400).json({
        success: false, message: "All Feilds are required"
      })
    }

    const internship = await Internship.create({
      title,
      companyName,
      description,
      skillsRequired,
      internshipType,
      duration,
      stipend: Number(stipend),
      mode,
      location,
      openings,
      createdBy: userId,
    })

    return res.status(201).json({
      success: true, message: "Internship created successfully",
      internship,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const getAllInternship = async (req, res) => {
  try {
    const internships = await Internship.find().populate("createdBy", "fullname email").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Internships fetched successfully",
      internships,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;

    const internship = await Internship.findById(id).populate("createdBy", "fullname email");

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Internship fetched successfully",
      internship,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const updatedInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const internship = await Internship.findById(id);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    const updatedInternship = await Internship.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Internship updated successfully",
      internship: updatedInternship,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({
        success: true,
        message: "Internship not found"
      })
    }

    await Internship.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const applyInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      })
    }

    if (internship.applicants.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Already applied for this internship",
      })
    }
    internship.applicants.push(userId);
    await internship.save();

    return res.status(200).json({
      success: true,
      message: "Applied successfully",
      internship,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const getInternshipApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const internship = await Internship.findById(id).populate("applicants", "fullname email role")
    if(!internship){
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      applicants: internship.applicants,
    });    


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    
  }
}

const changeInternshipStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    internship.status = status;

    await internship.save();

    return res.status(200).json({
      success: true,
      message: "Internship status updated successfully",
      internship,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {createInternship, getAllInternship, getInternshipById,updatedInternship, deleteInternship,applyInternship, getInternshipApplicants, changeInternshipStatus}