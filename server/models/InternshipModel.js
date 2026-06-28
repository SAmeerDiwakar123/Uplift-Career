// models/InternshipModel.js
import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    description: { type: String, required: true },
    skillsRequired: [{ type: String }],
    internshipType: { type: String }, 
    duration: { type: String, required: true },
    stipend: { type: Number, default: 0 },
    mode: { type: String }, 
    location: { type: String },
    openings: { type: Number, default: 1 },
    applyBy: { type: Date }, 
    isPPO: { type: Boolean, default: false }, 
    isActive: { type: Boolean, default: true },
    status: { type: String, default: "open" }, 
    applicants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Internship = mongoose.model("Internship", internshipSchema);