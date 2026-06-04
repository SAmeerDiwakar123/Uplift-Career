import { Company } from '../models/CompanyModel.js';
// Create a new company
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"


const createCompany = async (req, res) => {
  try {
    const { companyName} = req.body;

    if (!companyName) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({ success: false, message: "Company already exists" });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    })
    return res.status(201).json({ success: true, message: "Company created successfully", company });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({ success: false, message: "Company not found", companies });
    }
    return res.status(200).json({ success: true, companies });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    return res.status(200).json({ success: true, company });


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    let logo;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, website, location };
    if (logo) updateData.logo = logo;

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    return res.status(200).json({ success: true, message: "Company updated successfully", company });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });
    return res.status(200).json({ success: true, message: "Company deleted!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export { createCompany, getCompany, getCompanyById, updateCompany, deleteCompany };