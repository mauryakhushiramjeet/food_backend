import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/Food-Odering`);
    console.log("mongoose is connected");
  } catch (err) {
    console.log(err.message);
  }
};
