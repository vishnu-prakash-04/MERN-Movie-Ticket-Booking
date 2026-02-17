import express from "express";
import { addMovie, getMovies, getMovieById } from "../controllers/movieController.js";
import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", protect, adminOnly, addMovie);

export default router;
