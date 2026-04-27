import express from "express";
import {isRecruiter, isAdmin} from "../middlewares/authMiddleware.js";
import {
    REGISTER,
    LOGIN,
    USER_PROFILE,
    UPDATE_USER_PROFILE,

} from "../controllers/authController.js";
import upload from "../config/multer.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/register", REGISTER);
router.post("/login", LOGIN);
router.get("/profile", protect, USER_PROFILE);
router.put("/profile", protect, upload.fields([{name: "profileImage", maxCount: 1},
     {name: "resume", maxCount: 1}, ]),
  UPDATE_USER_PROFILE);

export default router;