import mongoose from "mongoose";

const enrolledSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", 
    required: true
  },
  enrolledAt: { type: Date, default: Date.now},
  expiresAt: { type: Date, required: true},
  progress: { type: Number, default: 0},
  status: {
    type: String, 
    enum: ["active", "expired", "completed"],
    default: "active",
  }
},{
  timestamps: true
});
export const Enrollment = mongoose.model("Enrollment", enrolledSchema)