import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    companyMail: {
        type: String,
        trim: true
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },

    document: {
        type: String,
        required: true,
    },

},
{timestamps: true});
const recruiterRequest = mongoose.model("Recruiter", recruiterSchema);
export default recruiterRequest;