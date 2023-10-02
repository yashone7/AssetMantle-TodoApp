import express from "express";
import { todosService } from "../services/todosService.js";
import { userService } from "../services/usersService.js";
import { logger } from "../middlewares/logger.js";
import { validateToken } from "../middlewares/auth.js";
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

// this is a protected
router.post("/todos", [validateToken], (req, res, next) => {
  return todosService.createTodo(req, res, next);
});

// lets make /todos a protected route
router.get("/todos", [validateToken], (req, res, next) => {
  return todosService.fetchTodos(req, res, next);
});

router.put("/todos/:id", [validateToken], (req, res, next) => {
  return todosService.updateTodo(req, res, next);
});

router.delete("/todos/:id", [logger, validateToken], (req, res, next) => {
  return todosService.deleteTodo(req, res, next);
});

router.get("/todos/:id", [logger, validateToken], (req, res, next) => {
  return todosService.fetchTodoById(req, res, next);
});

router.post("/user/validateToken/:token", (req, res, next) => {
  return userService.validateUserToken(req, res, next);
});

export default router;
