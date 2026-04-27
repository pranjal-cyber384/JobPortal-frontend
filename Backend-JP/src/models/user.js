import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minlength: [8, "minimum 8 character required"],
        trim: true,
    },

    role: {
        type: String,
        enum: ["jobseeker", "recruiter", "admin"],
        default: "jobseeker",
    },

    phone: {
        type: String,
        trim: true,
        unique: true,
        sparse: true
    },

    about: String,

    skills: [{
        type: String,

    }],
    education: {
        type: String,
    
    },
    experience: {
        type: String,
    },
    resume: {
      type: String,
    },
   profileImage: {
    type: String,
   },
   companyName: {
    type: String,
   },
   post: {
    type: String,
   },

},
{timestamps: true});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    //     {
    //     return next();
    // }
    this.password = await bcrypt.hash(this.password, 10);
    // next()
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
 