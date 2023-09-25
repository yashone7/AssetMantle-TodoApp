import { TodoModel } from "../Models/todoModel.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { logger } from "../middlewares/logger.js";

/** @type {import("express").RequestHandler} */
export async function createTodo(req, res, next) {
  try {
    const { task, description } = req.body;
    //   console.log(req.body);

    //   now save these fields into the db
    const todo = await TodoModel.create({ task, description });

    return res.status(200).json({ message: "todo created succesfully", todo });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
}

/** @type {import("express").RequestHandler} */
export async function fetchTodos(req, res, next) {
  try {
    const todos = await TodoModel.find();

    return res.status(200).json(todos);
  } catch (err) {
    errorHandler(err, req, res, next);
  }
}

/** @type {import("express").RequestHandler} */
export async function updateTodo(req, res, next) {
  try {
    const id = req.params.id;
    console.log(id);

    const updatedTodoBody = req.body;

    console.log(updatedTodoBody);

    const updatedTodo = await TodoModel.updateOne({ _id: id, updatedTodoBody });

    return res
      .status(200)
      .json({ message: "todos list updated successfully", updatedTodo });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
}

/** @type {import("express").RequestHandler} */
export async function deleteTodo(req, res, next) {
  try {
    const { id } = req.params;

    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    console.log(deletedTodo);

    return res.status(200).json({ message: "todo deleted successfully" });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
}

export async function fetchTodoById(req, res, next) {
  try {
    const todo = await TodoModel.findById(req.params.id);

    res.status(200).json(todo);
  } catch (err) {
    errorHandler(err, req, res, next);
  }
}

export const todosService = {
  fetchTodoById,
  deleteTodo,
  updateTodo,
  fetchTodos,
  createTodo,
};
