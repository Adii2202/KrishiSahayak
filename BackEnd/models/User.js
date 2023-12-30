import mongoose from "mongoose";
import validator from "validator";

const toDoListSchema = new mongoose.Schema({
  task: {
    type: String,
    enum: [
      "Sowing",
      "Picking",
      "Growing and Harvesting Crops",
      "Cattle hospitality",
      "Soil testing",
      "Equipment buying",
      "Equipment servicing",
      "Feeding livestock",
      "Other",
    ],
    required: true,
  },
  otherTask: {
    type: String,
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
  },
  todolist: [toDoListSchema],

  SoilComposition: {
    nLevel: { type: Number },
    pLevel: { type: Number },
    kLevel: { type: Number },
    phLevel: { type: Number },
  },
});

export const User = mongoose.model("User", userSchema);
