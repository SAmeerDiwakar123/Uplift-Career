import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: String },
  order: { type: Number, required: true },
  isFreePreview: { type: Boolean, default: false },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    category: { type: String, required: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advance"] },
    lessons: [lessonSchema],

    courseRatings: [
      { userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, rating: { type: Number, min: 1, max: 5 } }
    ],
    rating: { type: Number, default: 0 }, 
    
    enrolledStudents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    isPublished: { type: Boolean, default: false },
    validityYears: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);