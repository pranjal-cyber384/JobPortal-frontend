import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

import {
    GET_ALL_USER,
    DELETE_USER,
    ADMIN_DASHBOARD
} from "../controllers/adminController.js";

const router = express.Router();
router.get("/users", protect, isAdmin, GET_ALL_USER);
router.get("/stats", protect, isAdmin, ADMIN_DASHBOARD);
router.delete("/user/:id", protect, isAdmin, DELETE_USER);
export default router;

