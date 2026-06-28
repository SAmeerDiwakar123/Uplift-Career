import mongoose from "mongoose";

const savedInternshipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },
  },
  { timestamps: true }
);

export const SavedInternship = mongoose.model("SavedInternship", savedInternshipSchema);