import mongoose from "mongoose";

export const connectDB = async () => {
  const { connection } = await mongoose.connect(
    "mongodb://localhost:27017/locationDB"
  );
  console.log(`Mongo connected with ${connection.host}`);
};
