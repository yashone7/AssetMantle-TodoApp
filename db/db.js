import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  try {
    let mongodbUri = "";

    if (process.env.APP_ENV === "LOCAL") {
      mongodbUri = process.env.MONGODB_URI_LOCAL;
    } else {
      mongodbUri = process.env.MONGODB_URI_CLOUD;
    }

    await mongoose.connect(mongodbUri);
    console.log("connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}
