import mongoose from "mongoose";

const internshipApplicationSchema = new mongoose.Schema(
  {
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected", "selected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const InternshipApplication = mongoose.model(
  "InternshipApplication",
  internshipApplicationSchema
);