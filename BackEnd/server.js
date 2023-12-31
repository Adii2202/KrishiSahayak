import opencage from "opencage-api-client";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./config/database.js";
import { Location } from "./models/Location.js";
import locationRoute from "./routes/allRoutes.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", locationRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
