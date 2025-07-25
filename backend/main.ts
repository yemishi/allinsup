import express from "express";
import routes from "./index";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectMongoDB";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL,
  })
);
app.use("/api", routes);

connectDB().catch((error) => {
  console.error("Failed to connect to the database:", error);
});

export default app;
