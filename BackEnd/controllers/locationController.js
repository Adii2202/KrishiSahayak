import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import opencage from "opencage-api-client";
import { User } from "../models/User.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { sendToken } from "../middlewares/sendToken.js";

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

    if (!name || !email || !password)
      return next(new ErrorHandler("Please enter all fields", 400));

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already exists", 409));

    // Hash the password before saving it to the database
    // const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
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

    // await newUser.save();

    // Send token upon successful registration
    sendToken(res, user, "User registered successfully", 201);
    // res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // const file = req.file;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  // upload file on cloudinary

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  // send token function here as bohot saare tokens banane hai
  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

export const getUserLocation = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const userLocation = {
      latitude: user.location[0].latitude,
      longitude: user.location[0].longitude,
    };

    res.status(200).json({ location: userLocation });
  } catch (error) {
    console.error("Error fetching user location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
