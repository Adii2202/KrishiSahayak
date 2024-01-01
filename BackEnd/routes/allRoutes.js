import express from "express";
import {
  location,
  login,
  register,
} from "../controllers/locationController.js";

const router = express.Router();

router.route("/api/location").post(location);
router.route("/api/register").post(register);
router.route("/api/login").post(login);

export default router;
