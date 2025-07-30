import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
   const dbUrl = process.env.MONGO_URI;

   await mongoose
      .connect(
         dbUrl
      ).then(() => {
         console.log("MongoDB connected successfully");
      }).catch((error) => {
         console.error("MongoDB connection error:", error);
         process.exit(1);
      });
};

export default connectDB;
