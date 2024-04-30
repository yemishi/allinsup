import express from "express";
import routes from "./index";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectMongoDB";

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL,
  })
);
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
