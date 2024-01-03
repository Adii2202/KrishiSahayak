import express from "express";
import {
  getUserLocation,
  location,
  login,
  register,
} from "../controllers/locationController.js";

const router = express.Router();

router.route("/api/location").post(location);
router.route("/api/register").post(register);
router.route("/api/login").post(login);
router.route("/api/getuserlocation").get(getUserLocation);

export default router;
