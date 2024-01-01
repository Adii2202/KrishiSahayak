import express from "express";
import { location, register } from "../controllers/locationController.js";

const router = express.Router();

router.route("/api/location").post(location);
router.route("/api/register").post(register);

export default router;
