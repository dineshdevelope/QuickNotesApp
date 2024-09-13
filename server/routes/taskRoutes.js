const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getSingletTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getSingletTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
