import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    location: { type: String, required: true },
    isRemote: { type: Boolean, default: false },
    stipend: { type: Number, default: 0 },
    duration: { type: String, required: true }, // "3 months"
    openings: { type: Number, default: 1 },
    skills: [{ type: String }],
    applyBy: { type: Date },
    category: { type: String },
    isPPO: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InternshipApplication",
      },
    ],
  },
  { timestamps: true }
);

export const Internship = mongoose.model("Internship", internshipSchema);