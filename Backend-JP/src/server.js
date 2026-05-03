import express from "express";
import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import {protect} from "./middlewares/authMiddleware.js";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import recruiterRequest from "./models/recruiterRequest.js";
config();
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/upload", express.static("upload"));

app.use("/api/auth", authRoutes);
app.use("/api/recruiter", requestRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
const PORT= process.env.PORT || 3000;

app.listen (PORT, ()=> {
    console.log("Server started on", PORT);
    
});

