import express from "express";
import {
  getUserLocation,
  location,
  login,
  register,
} from "../controllers/locationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/location").post(location);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getuserlocation").get(getUserLocation);

export default router;
