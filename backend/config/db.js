import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://shakebshamsi:789520@cluster0.zvhhp1o.mongodb.net/foodKart"
    ).then(() => {
      console.log("MongoDB connected successfully");
    }).catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });
};

export default connectDB;
