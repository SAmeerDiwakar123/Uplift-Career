import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  
  skills: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Skill' 
  }],
  
  isActive: { 
    type: Boolean, 
    default: true 
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Freelance"],
    required: true
  },
  
  experienceLevel: {
    type: String,
    enum: ["Fresher (0-1 yr)", "Junior (1-3 yrs)", "Mid (3-5 yrs)", "Senior (5-8 yrs)", "Lead (8+ yrs)"],
    required: true
  },
  
  salary: { type: Number, required: true },
  location: { type: String, required: true },
  position: { type: String, required: true },
  
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
}, { timestamps: true });

jobSchema.index({ category: 1, skills: 1, isActive: 1 });

export const Job = mongoose.model('Job', jobSchema);



// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema({
//   title: { type: String , required: true },
//   description: { type: String , required: true},
//   requirements: [{ type: String }],
//   salary: {type: Number, required: true},
//   location: {type: String, required: true},
//   jobType: {type: String , required: true},
//   experienceLevel: {type: Number , required: true},
//   position: {type: String , required: true},
//   company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
//   created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true },
//   applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application',}],
// }, {timestamps: true});

// export const Job = mongoose.model('Job', jobSchema);