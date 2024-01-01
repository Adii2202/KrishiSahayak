import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import opencage from "opencage-api-client";
import { User } from "../models/User.js";
import ErrorHandler from "../middlewares/errorHandler.js";

export const location = catchAsyncError(async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    // print(process.env.OPEN_CAGE_API_KEY);
    // Use OpenCage API to get location details
    const apiKey = "af5ab23220644e0dad25a034916a05de";
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
      // const newLocation = new Location(locationData);
      // await newLocation.save();

      res.json(locationData);
    } else {
      res.status(500).json({ error: "Unable to fetch location details" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const register = catchAsyncError(async (req, res, next) => {
  try {
    const {
      name,
      email,
      latitude,
      longitude,
      statename,
      cityname,
      pincode,
      address,
      password,
    } = req.body;
    console.log(latitude, longitude);
    if (!name || !email || !password)
      return next(new ErrorHandler("Please enter all fields", 400));

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already exists", 409));

    const newUser = new User({
      name,
      email,
      password,
      location: [
        {
          latitude,
          longitude,
          city: cityname,
          state: statename,
          pincode,
          address,
        },
      ],
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
