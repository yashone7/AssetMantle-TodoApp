import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/todoApp");
    console.log("connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}
