import express from "express";
//require("dotenv").config();
import dotenv from "dotenv";
const app = express();
import mongoose from "mongoose";
const PORT = process.env.PORT || 4000;
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
dotenv.config();
//Middleware
app.use((req, res, next) => {
  console.log(`Path ${req.path}  & Method :${req.method}`);
  next();
});

app.use(express.json());

app.use(cors());

/* app.get("/", (req, res) => {
  res.send("Hello World");
}); */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`MongoDB connected Sucessfully  ${PORT}`);
  })
  .catch((error) => console.log(error));

app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
