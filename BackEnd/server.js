import opencage from "opencage-api-client";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./config/database.js";
import { Location } from "./models/Location.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Use OpenCage API to get location details
    const apiKey = "af5ab23220644e0dad25a034916a05de";
    // const opencage = require("opencage-api-client");
    const data = await opencage.geocode({
      q: `${latitude}, ${longitude}`,
      key: apiKey,
    });

    if (data.status.code === 200 && data.results.length > 0) {
      const place = data.results[0];
      const locationData = {
        latitude,
        longitude,
        city: place.components.city,
        state: place.components.state,
        pincode: place.components.postcode,
        address: place.formatted,
      };

      // Save location data to MongoDB
      const newLocation = new Location(locationData);
      await newLocation.save();

      res.json(locationData);
    } else {
      res.status(500).json({ error: "Unable to fetch location details" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
