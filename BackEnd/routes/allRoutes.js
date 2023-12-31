import express from "express";
import { location } from "../controllers/locationController.js";

const router = express.Router();

router.route("/api/location").post(location);

export default router;
