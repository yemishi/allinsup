import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_CONNECT_URL as string)
    .then(() => {
      console.log("Connected to MongoDB successfully!");
    })
    .catch((error) => {
      console.error(`Connection failed: ${error.message}`);
    });
};
export default connectDB;
