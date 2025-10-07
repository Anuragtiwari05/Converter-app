import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected || mongoose.connections[0].readyState) {
      console.log("✅ Already connected to DB");
      isConnected = true;
      return;
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("please define the MONGODB_URI in your .env file");
    }

    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ DB connection error:", error);
    throw error;
  }
};
