
import UserModel from "../models/user.js";
import recruiterRequest from "../models/recruiterRequest.js";

export const RECRUITER_REQUEST = async (req, res) => {
try {
    
    const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(400).json({
           status: "failed",
           message: "User not found",
           data: null,   
            });
        }
    const {companyName, companyMail} = req.body;
        
        if (!req.file) {
           return res.status(400).json({
            status: "failed",
            message: "file not found",
            data: null
           });
        }

    if (!companyName || !companyMail ) {
         return res.status(400).json({
               status: "failed",
               message: "All fields are required",
               data: null,
            });
    }
        const existingRequest = await recruiterRequest.findOne({user: user.id, status: "pending"});
        if (existingRequest) {
            return res.status(400).json({
                status: "failed",
                message: "request already exists",
                data: existingRequest.status
            });
        }

         const document = `/upload/${req.file.filename}`;

         const request = await recruiterRequest.create({
            user: user._id,
            companyName,
            companyMail,
            document
        
        });

        return res.status(200).json({
            status: "success",
            message: "request submitted successfully",
            data: request.status
        });


} catch (error) {
    return res.status(400).json({
        status: "failed",
        message: error.message,
        data: null
    });
}
};


export const RECRUITER_REQUEST_APPROVEL = async (req, res) => {
    try {
        const requestId = req.params.id;
        const {action} = req.body;
        if(!action || !["approve", "reject"].includes(action)){
            return res.status(400).json({
                status: "failed",
                message: "invalid action",
                data: null
            });
        }

        const request = await recruiterRequest.findById(requestId);
        if (!request) {
            return res.status(400).json({
                status: "failed",
                message: "request not found",
                data: null
            });
        }

        if(request.status !== "pending") {
            return res.status(400).json({
                status: "failed",
                message: "request already processed",
                data: null
            });
         }
        console.log("Request:", request);
        console.log("request user id", request.user)
       const user = await UserModel.findById(request.user);
       console.log("Fetched user:", user);
       if(!user) {
        return res.status(400).json({
             status: "failed",
                message: "User not found",
                data: null
        });
       } 

       if(action === "approve") {
        console.log("Before role:", user.role);
        await UserModel.findByIdAndUpdate(
         request.user,
        { role: "recruiter" },
        { new: true }
         );
        console.log("After role:", user.role);
        request.status = "approved";
        
       }

       if (action === "reject") {
        request.status = "rejected";
       }

       await request.save();

       return res.status(200).json({
        status: "success",
        message: `request ${action} successfully`,
        data: {requestState: request.status,
            updatedRole: user.role
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


export const GET_ALL_REQUEST = async (req, res) => {
    try {
        const requests = await recruiterRequest.find({
            status: "pending"
        })
         .populate("user", "name email role"); 
        return res.status(200).json({
            status: "success",
            message: "requests fetched successfully",
            data: requests
        });
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null
        });
    }
};