import express from "express";

const router = express.Router();

import {
  createTask,
  getTasks,
  getSingletTask,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getSingletTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
