import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
    trim: true
   },

   description: {
    type: String,
    required: true,
    minlength: 50,
    trim: true,
   },

   companyName: {
    type: String,
    required: true,
    trim: true,
   },
   
  location: {
    type: String,
    required: true,
    trim: true,
  },

  salary: {
    type: String,
    trim: true,
    required: true,
  },

  jobType: {
    type: String,
    enum: ["full-Time", "part-time", "freelance", "internship", "remote"],
    trim: true
  },

  category: {
     type: String,
     enum: ["it-tech", "creative-design", "marketing", "finance" ],
     trim: true
  },
  
  experienceLevel: {
    type: String,
    enum: ["entry-level", "intermediate", "senior"],
    trim: true
  },

  skillsRequired: {
    type: String,
    required: true,
    trim: true
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  deadline: {
    type: Date,
  },
  
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
    trim: true
  },


},
{timestamps: true});

const jobModel = mongoose.model("Job", jobSchema);
export default jobModel;