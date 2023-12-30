import express from "express";
import { location } from "../controllers/locationController";

const router = express.Router();

router.route("/api/location").post(location);
