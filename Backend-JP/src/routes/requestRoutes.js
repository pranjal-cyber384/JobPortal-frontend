import express from "express";
import { isAdmin, isRecruiter } from "../middlewares/authMiddleware.js";
import { RECRUITER_REQUEST,
    RECRUITER_REQUEST_APPROVEL,
    GET_ALL_REQUEST
 } from "../controllers/recruiterRequestController.js";
import upload from "../config/multer.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/recruiter/apply", protect, upload.single("document"), RECRUITER_REQUEST);
router.patch("/request/:id", protect, isAdmin, RECRUITER_REQUEST_APPROVEL);
router.get("/requests", protect, isAdmin, GET_ALL_REQUEST);

export default router;