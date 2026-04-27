import express from "express";
import { isRecruiter, isAdmin } from "../middlewares/authMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
    CREATE_JOB,
    GET_ALL_JOBS,
    GET_MY_JOBS,
    GET_SINGLE_JOB,
    UPDATE_JOB,
    DELETE_JOB
} from "../controllers/jobControllers.js"

const router = express.Router();
router.post("/", protect, isRecruiter, CREATE_JOB);
router.get("/jobs", GET_ALL_JOBS);
router.get("/recruiter/my-jobs", protect, isRecruiter, GET_MY_JOBS);
router.put("/jobs/:id", protect, isRecruiter, UPDATE_JOB);
router.get("/jobs/:id", GET_SINGLE_JOB);
router.delete("/jobs/:id", protect, DELETE_JOB);
export default router; 

