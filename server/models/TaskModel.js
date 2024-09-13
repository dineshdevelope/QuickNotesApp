import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Task", TaskSchema);

export default taskModel;
