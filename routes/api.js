import express from "express";
import { todosService } from "../services/todosService.js";
import { userService } from "../services/usersService.js";
import { logger } from "../middlewares/logger.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({ message: "welcome to todos api..." });
});

router.post("/users/register", (req, res, next) => {
  return userService.registerUser(req, res, next);
});

router.post("/users/login", (req, res, next) => {
  return userService.loginUser(req, res, next);
});

router.post("/todos", (req, res, next) => {
  return todosService.createTodo(req, res, next);
});

router.get("/todos", (req, res, next) => {
  return todosService.fetchTodos(req, res, next);
});

router.put("/todos/:id", (req, res, next) => {
  return todosService.updateTodo(req, res, next);
});

router.delete("/todos/:id", [logger], (req, res, next) => {
  return todosService.deleteTodo(req, res, next);
});

router.get("/todos/:id", [logger], (req, res, next) => {
  return todosService.fetchTodoById(req, res, next);
});

export default router;
