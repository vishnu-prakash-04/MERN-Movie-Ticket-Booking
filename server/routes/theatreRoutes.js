import express from "express";
import { addTheatre, getTheatres } from "../controllers/theatreController.js";
import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTheatres);
router.post("/", protect, adminOnly, addTheatre);

export default router;
