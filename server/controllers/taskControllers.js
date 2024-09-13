import mongoose from "mongoose";
import taskModel from "../models/TaskModel.js";

//To Create A Task -POST Method
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await taskModel.create({ title, description });
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//Show Task - GET Method
//To Get ALL Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//To get a Single task -GET
export const getSingletTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id Not Found" });
  }
  try {
    const singleTask = await taskModel.findById(id);
    res.status(200).json(singleTask);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//To Update a Task -PATCH
export const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }
  try {
    const task = await taskModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ task });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//Delete a Task -DELETE
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }
  try {
    const task = await taskModel.findByIdAndDelete(id);
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: "Task Not Found" });
  }
};
