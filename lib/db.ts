import mongoose from "mongoose";

const MONGODB_URI : string = process.env.MONGODB_URI as string;

if(!MONGODB_URI){
    throw new Error("please define the uri")
}

export const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("✅ Already connected to DB");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ DB connection error:", error);
    throw error;
  }
};