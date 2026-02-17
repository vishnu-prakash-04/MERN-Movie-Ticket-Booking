import express from "express";
import { addShow, getShowsByMovie, getShowById } from "../controllers/showController.js";
import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, addShow);
router.get("/:movieId", getShowsByMovie);
router.get("/details/:showId", getShowById);


export default router;
