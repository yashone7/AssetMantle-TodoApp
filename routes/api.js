import express from "express";
import { TodoModel } from "../Models/todoModel.js";
import {
  createTodo,
  fetchTodos,
  updateTodo,
} from "../services/todosService.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({ message: "welcome to todos api..." });
});

router.post("/todos", (req, res, next) => {
  return createTodo(req, res, next);
});

router.get("/todos", (req, res, next) => {
  return fetchTodos(req, res, next);
});

router.put("/todos/:id", (req, res, next) => {
  return updateTodo(req, res, next);
});

export default router;
