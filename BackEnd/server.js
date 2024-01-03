import opencage from "opencage-api-client";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import locationRoute from "./routes/allRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

config({
  path: "./config/config.env",
});

connectDB();
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/", locationRoute);
// app.use("", locationRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
