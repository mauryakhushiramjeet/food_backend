import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./mongoDb/mongoDbConfig.js";
import router from "./Routes/routes.js";
dotenv.config();
const app = express();
const Port = process.env.PORT || 8085;
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", router);
app.listen(Port, () => {
  connectDb();
  console.log(`Server is running on port${""} ${Port}`);
});
app.get("/", (req, res) => {
  res.send(`Server is running on port${""} ${Port}`);
});
