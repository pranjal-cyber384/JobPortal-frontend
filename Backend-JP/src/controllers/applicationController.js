import applicationModel from "../models/application.js";
import jobModel from "../models/job.js";
import UserModel from "../models/user.js";

export const APPLY_JOB = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(400).json({
           status: "failed",
           message: "User not found",
           data: null,   
            });
        }
        
    const jobId = req.params.jobId;
        
    const job = await jobModel.findById(jobId);
    if (!job) {
        return res.status(400).json({
            status: "failed",
            message: "job not found",
            data: null
        });
    }

    const coverLetter = req.body.coverLetter;
    if (!req.file) {
           return res.status(400).json({
            status: "failed",
            message: "file not found",
            data: null
           });
        }
    if(!coverLetter) {
        return res.status(400).json({
          status: "failed",
          message: "coverletter required"
        });
    }

     const existingApplication = await applicationModel.findOne({job: jobId, applicant: req.user._id});
        if (existingApplication) {
            return res.status(400).json({
                status: "failed",
                message: "you have already applied for this job",
            });
        }
         const resume = `/upload/${req.file.filename}`;

         const application = await applicationModel.create({
            applicant: user._id,
            job: jobId,
            coverLetter,
            resume
         });

         res.status(200).json({
            status: "success",
            message: "application submitted successfully",
            data: application,
         });



    } catch (error) {
        return res.status(400).json({
        status: "failed",
        message: error.message,
        data: null
        });
    }
   

};

export const MY_APPLICATIONS = async (req, res) => {
    try {
         if (req.user.role !== "jobseeker") {
        return res.status(400).json({
         status: "failed",
         message: "only Jobseeker can see",
         data: null
        });
    }
    
         let {page = 1, limit = 10} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if ( limit > 40) limit = 40;
    const skip = (page - 1) * limit;
    let filter = {};
    filter.applicant = req.user._id;
    let query = await applicationModel.find(filter)
    .populate("job", "title companyName")
    .skip(skip)
    .limit(limit)
    .sort({createdAt: -1});
    const applications = query;
    const totalapplication = await applicationModel.countDocuments(filter);
    const totalPages = Math.ceil(totalapplication / limit);
    res.status(200).json({
     status: "success",
     message: "your application fetched",
     total: totalapplication,
     page,
     pages: totalPages,
     data: applications
    });
    } catch (error) {
         return res.status(400).json({
        status: "failed",
        message: error.message,
        data: null
    });
    }
};

export const GET_APPLICANTS = async (req, res) => {
     console.log("PARAMS:", req.params);
console.log("USER:", req.user);


    try {
       
         const jobId = req.params.jobId;
         console.log("JOB ID:", req.params.jobId);
    if(req.user.role === "jobseeker"){
    return res.status(400).json({ status: "failed",
     message: "you are not allowed",
     data: null
    });
     }
        
    const job = await jobModel.findById(jobId);
    if (!job) {
        return res.status(400).json({
            status: "failed",
            message: "job not found",
            data: null
        });
    }
        // if( job.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin"){
        // return res.status(400).json({ status: "failed",
        //      message: "you are not allowed",
        //       data: null
        //      });
        //      }
        if (
  job.postedBy &&
  job.postedBy.toString() !== req.user._id.toString() &&
  req.user.role !== "admin"
) {
  return res.status(403).json({
    status: "failed",
    message: "Not authorized to view applicants",
  });
}
     let {page = 1, limit = 10} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if ( limit > 40) limit = 40;
    const skip = (page - 1) * limit;
    let filter = {};
    filter.job = jobId
    console.log("FILTER:", filter);
console.log("APPLICATIONS FOUND:", await applicationModel.find(filter));
    let applicants = await applicationModel.find(filter)
    .populate("applicant", "name email skills")
    .skip(skip)
    .limit(limit)
    .sort({createdAt: -1});
    // const applicants = query;
     const totalapplicants = await applicationModel.countDocuments(filter);
     const totalPages = Math.ceil(totalapplicants / limit);
     res.status(200).json({
     status: "success",
     message: "Applicants fetched successfully",
     totalapplicants,
     page,
     pages: totalPages,
     data: applicants
    });
    } catch (error) {
           return res.status(400).json({
        status: "failed",
        message: error.message,
        data: null
    });
    }
};

export const UPDATE_APPLICATION_STATUS= async (req, res) => {
    try {
         const applicationId = req.params.id;
        const {action} = req.body;
        if(!action || !["approve", "reject"].includes(action)){
            return res.status(400).json({
                status: "failed",
                message: "invalid action",
                data: null
            });
        }
        const application = await applicationModel.findById(applicationId);
        if (!application) {
            return res.status(400).json({
                status: "failed",
                message: "request not found",
                data: null
            });
        }

        if(application.status !== "pending") {
            return res.status(400).json({
                status: "failed",
                message: "request already processed",
                data: null
            });
         }
         const job = await jobModel.findById(application.job);
          if (!job) {
        return res.status(400).json({
            status: "failed",
            message: "job not found",
            data: null
        });
         }

          if( job.postedBy.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res.status(400).json({ status: "failed",
             message: "you are not allowed",
              data: null
             });
             }

         if(action === "approve") {
        console.log("Before status:", application.status );
        application.status = "accepted";
        await application.save();
        console.log("After status:", application.status);
        application.status = "accepted";
       }

       if (action === "reject") {
        application.status = "rejected";
       }

       await application.save();
       return res.status(200).json({
        status: "success",
        message: `application ${action} successfully`,
        data: {applicationState: application.status,
        }
       });

    } catch (error) {
         return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null
        });
    }
};