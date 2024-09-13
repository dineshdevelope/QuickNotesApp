const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
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

app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
app.use("/api/tasks", taskRoutes);
