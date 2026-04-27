import UserModel from "../models/user.js";
import jobModel from "../models/job.js";
import applicationModel from "../models/application.js";

export const GET_ALL_USER = async (req, res) => {
    try {
         let {
            page = 1,
            limit = 10,
            keyword
        } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        if ( limit > 40) limit = 40;
        const skip = (page - 1) * limit;
        let filter = {};
        if (keyword) { filter.$or = [
            {name: {$regex: keyword, $options: "i"}},
            {email: {$regex: keyword, $options: "i"}},
        ];}
        const users = await UserModel.find(filter).select("-password")
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1});
        const totalUsers = await UserModel.countDocuments(filter);
        const totalPages = Math.ceil( totalUsers/limit);
         return res.status(200).json({
            status: "success",
            message: "users fetched",
            total: totalUsers,
            page,
            pages: totalPages,
            data: users
        });
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};


export const DELETE_USER = async (req, res) => {
    try {
         if(req.user.role !== "admin") {
             return res.status(400).json({
             status: "failed",
             message: "you are not allowed",
             data: null
            });
        }
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(400).json({
             status: "failed",
             message: "user not found",
             data: null
            });
            
        }

       
        await UserModel.findByIdAndDelete(userId);
         res.status(200).json({
            status: "success",
            message: "user deleted successfully",
            data: null
        });


    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

export const ADMIN_DASHBOARD = async (req, res) => {
    try {
        if(req.user.role !== "admin") {
             return res.status(400).json({
             status: "failed",
             message: "you are not allowed",
             data: null
            });
        }
        const [ totalUser, totalJob, totalApplications, recruiterCount, jobseekerCount]
        = await Promise.all([
            UserModel.countDocuments({}),
            jobModel.countDocuments({}),
            applicationModel.countDocuments({}),
            UserModel.countDocuments({ role: "recruiter"}),
            UserModel.countDocuments({role: "jobseeker"}),
        ]);
        return res.status(200).json({
            status: "success",
            message: "dashboard fetched successfully",
            data: {
                totals: {
                    totalUser,
                    totalJob,
                    totalApplications,
                    recruiter: recruiterCount,
                    jobseeker: jobseekerCount,
                },
            },
        });
    } catch (error) {
         return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};