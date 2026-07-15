import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  displayName: {
    type: String,
    required: true,
    trim: true
  },

  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }],

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export const Skill = mongoose.model("Skill", skillSchema);