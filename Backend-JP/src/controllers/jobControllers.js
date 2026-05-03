import jobModel from "../models/job.js";

export const CREATE_JOB = async (req, res) => {
    try {
        const {title, description, companyName, location, salary, jobType,
               experienceLevel, skillsRequired, deadline, status, category} = req.body;
               if (!title || !description || !companyName || !location || !salary 
                || !jobType || !experienceLevel || !skillsRequired || !category) {
                return res.status(400).json({
                    status: "failed",
                    message: "all fields are required",
                    data: null
                });
               }

               const job = await jobModel.create({
                 title, description, companyName, location,
                 salary, jobType, experienceLevel, skillsRequired,
                 deadline, status, category, postedBy: req.user._id  
               });

               res.status(200).json({
                status: "success",
                message: "job created successfully",
                data: job
               });

    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null
        });
    }
};


export const GET_SINGLE_JOB = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobModel.findById(jobId);
        if(!job) {
            return res.status(400).json({
            status: "failed",
            message: "job not found",
            data: null
            });

            
        }

        res.status(201).json({
            status: "success",
            message: "job fetched",
            data: job
        });
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null
        });
    }
};

export const GET_ALL_JOBS = async (req, res) => {
    try {
        res.set("Cache-Control", "no-store");
        let {
            page = 1,
            limit = 10,
            location, jobType, experienceLevel, salary, keyword, category,
        } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        if ( limit > 40) limit = 40;
        const skip = (page - 1) * limit;
        let filter = {};
        if (location) {filter.location = {$regex: location, $options: "i"};}
        if (jobType) {filter.jobType = jobType; }
        if (category) {filter.category = category; }
        if (experienceLevel) { filter.experienceLevel = experienceLevel; }
        if (salary) {filter.salary = { $gte: Number(salary)}; }
        if (keyword) { filter.$or = [
            {title: {$regex: keyword, $options: "i"}},
            {description: {$regex: keyword, $options: "i"}},
        ];}

        const jobs = await jobModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1});

        const totalJobs = await jobModel.countDocuments(filter);
        const totalPages = Math.ceil( totalJobs/limit);
        return res.status(200).json({
            status: "success",
            message: "jobs fetched",
            total: totalJobs,
            page,
            pages: totalPages,
            data: jobs,

        });

    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null
        });
    }
};

export const UPDATE_JOB = async (req, res) => {
    try {
         const {id} = req.params;
         const {title, description, companyName, location, salary, jobType,
               experienceLevel, skillsRequired, deadline} = req.body;
               const job = await jobModel.findById({_id: id});
               if(!job) {
                return res.status(400).json({
                    status: "failed",
                    message: "job not found",
                    data: null
                });
               }
               if (job.postedBy.toString() !== req.user._id.toString()) {
                return res.status(400).json({
                status: "failed",
                message: "you are not allowed to update this job",
                data: null
                });
               }
               job.title = title ?? job.title;
               job.description = description ?? job.description;
               job.companyName = companyName ?? job.companyName;
               job.location = location ?? job.location;
               job.salary = salary ?? job.salary;
               job.jobType = jobType ?? job.jobType;
               job.experienceLevel = experienceLevel ?? job.experienceLevel;
               job.skillsRequired = skillsRequired ?? job.skillsRequired;
               job.deadline = deadline ?? job.deadline;

               const updatedJob = await job.save();
               res.status(200).json({
                status: "success",
                message: "job updated successfully",
                data: updatedJob
               });
    
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null
        });
    }
};

export const DELETE_JOB = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobModel.findById(jobId);
        if(!job) {
             return res.status(400).json({
                    status: "failed",
                    message: "job not found",
                    data: null
                });
        }
        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== "admin")
        {
            return res.status(400).json({
                status: "failed",
                message: "you are not allowed to delete",
                data: null
            });
        }

        await jobModel.findByIdAndDelete(jobId);
        res.status(200).json({
            status: "success",
            message: "job deleted successfully",
            data: null
        });
    } catch (error) {
         return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null
        });
    }
};


export const  GET_MY_JOBS = async (req, res) => {
try {
    let {page = 1, limit = 10} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if ( limit > 40) limit = 40;
    const skip = (page - 1) * limit;
    let filter = {};
    filter.postedBy = req.user._id;
    let query = await jobModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({createdAt: -1});
    const jobs = query;
    const totalJobs = await jobModel.countDocuments(filter);
    const totalPages = Math.ceil(totalJobs / limit);
    res.status(200).json({
     status: "success",
     message: "your jobs fetched",
     total: totalJobs,
     page,
     pages: totalPages,
     data: jobs
    });
} catch (error) {
    return res.status(400).json({
        status: "failed",
        message: error.message,
        data: null
    });
}
};

