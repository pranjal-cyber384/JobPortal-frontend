import UserModel from "../models/user.js";
import generateToken from "../utlis/generateToken.js";





export const REGISTER = async (req, res) => {
    try {
        
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
               status: "failed",
               message: "Name, email and password are required",
               data: null,
            });
            }

         const existingUser = await UserModel.findOne({email});
            console.log("existinguser", existingUser);
            if (existingUser) {
                return res.status(400).json({
                    status: "failed",
                    message: "User already exists",
                    data: null,
                });
            };

          const user = await UserModel.create({
            name,
            email,
            password,
          });

          return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
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

// export const LOGIN = async (req, res) => {
//     try {
//         const {email, password} = req.body;
//         if(!email, !password) {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "Email and password are required",
//                 data: null,
//             });
//         }
         
//         const user = await UserModel.findOne({email});
//         if (!user) {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "User not found",
//                 data: null,
//             });
//         }
//         const validatePassword = await user.matchPassword(password);
//         if (!validatePassword) {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "Invalid password",
//                 data: null,

//             });
//         }

//         return res.status(201).json({
//             status: "success",
//             message: "Login successful",
//             data: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 token: generateToken(user._id),
//             },
//         });
//     } catch (error) {
//         return res.status(400).json({
//             status: "failed",
//             message: error.message,
//             data: null,
//         });
//     }
// };



export const LOGIN = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User not found",
      });
    }

    const validatePassword = await user.matchPassword(password);

    if (!validatePassword) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};


export const USER_PROFILE = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");
       if (!user) {
        return res.status(400).json({
            status: "failed",
            messsage: "User not found",
            data: null,
        });
       }

       return res.status(200).json({
        status: "success",
        message: "USER found",
        data: user,
       });
        
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message,
            data: null
        });
    }
};

export const UPDATE_USER_PROFILE = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(400).json({
           status: "failed",
           message: "User not found",
           data: null,   
            });
        }

        const {name, email, password, phone, about, skills, education, experience, companyName, post, role} = req.body;
        if (email && email !== user.email) {
            const emailTaken = await UserModel.findOne({email, _id: {$ne: user._id}});
            if (emailTaken) {
                return res.status(400).json({
                    status: "failed",
                    message: "Email already in use",
                    data: null
                });
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.about = about || user.about;
        user.skills = skills || user.skills;
        user.education = education || user.education;
        user.experience = experience || user.experience;
        user.companyName = companyName || user.companyName;
        user.post = post || user.post;
        user.role = role || user.role;
        if (password) {
            user.password = password
        };

        if (req.files?.profileImage) {
      user.profileImage = `/upload/${req.files.profileImage[0].filename}`;
    }

    if (req.files?.resume) {
      user.resume = `/upload/${req.files.resume[0].filename}`;
    }


        const updatedUser = await user.save();

        return res.status(200).json({
            status: "success",
            message: "User profile updated successfully",
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                about: updatedUser.about,
                skills: updatedUser.skills,
                education: updatedUser.education,
                experience: updatedUser.experience,
                companyName: updatedUser.companyName,
                post: updatedUser.post,
                role: updatedUser.role,
                profileImage: updatedUser.profileImage,
                resume: updatedUser.resume,
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

// export const UPLOAD_FILE = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         let updateData = {};
        
        
       
         
//         if (Object.keys(updateData).length === 0) {
//         return res.status(400).json({
//             status: "failed",
//             message: "No file uploaded",
//             data: null
//         });
//         }
    
      
     
//        const updatedUser = await UserModel.findByIdAndUpdate(
//         userId,
//         updateData,
//         {new: true}
//       );
//       return res.status(200).json({
//         status: "success",
//         message: "uploaded successfully",
//         data: updatedUser
//       });

//     } catch (error) {
//         return res.status(400).json({
//             status: "failed",
//             message: error.message,
//             data: null
//         });
//     }
// };

