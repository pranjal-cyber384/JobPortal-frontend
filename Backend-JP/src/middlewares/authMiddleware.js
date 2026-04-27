import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

export const protect = async (req, res, next) => {
let token;
if(req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
) {
    token = req.headers.authorization.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return res.status(401).json({
            status: "failed",
            message: "Not Authorized",
            data: null,
        });
    }
  const user = await UserModel.findById(decoded.id).select("-password");
  if (!user) {
    return res.status(401).json({
        status: "failed",
        message: "Not Authorized, user not found",
        data: null,
    });
  }

  req.user = user;
  return next();

}
 return res.status(401).json({
    status: "failed",
    message: "no token provided",
    data: null,
 });
};

export const isRecruiter = (req, res, next) => {
    if (req.user && req.user.role === "recruiter") {
        return next();
    }
    return res.status(403).json({
        status: "failed",
        messsage: "Recruiter access required",
        data: null,
    });
};

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).json({
        status: "failed",
        message: "admin access required",
        data: null,
    });
};
