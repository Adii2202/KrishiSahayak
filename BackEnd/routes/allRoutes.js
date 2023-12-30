import express from "express";
import { location } from "../controllers/locationController";

const router = express.Router();

router.route("/location").post(location);
