import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
    APPLY_JOB,
    MY_APPLICATIONS,
    GET_APPLICANTS,
    UPDATE_APPLICATION_STATUS
} from "../controllers/applicationController.js";
import upload from "../config/multer.js";

const router = express.Router();
router.get("/my-applications", protect, MY_APPLICATIONS);
router.post("/:jobId/apply", protect, upload.single("resume"), APPLY_JOB);
router.get("/job/:jobId", protect, GET_APPLICANTS);
router.put("/:id/status", protect, UPDATE_APPLICATION_STATUS);

export default router;

