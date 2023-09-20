import mongoose, { Schema } from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const TodoModel = mongoose.model("Todos", TodoSchema);
