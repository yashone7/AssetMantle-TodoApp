import { TodoModel } from "../Models/todoModel.js";

/** @type {import("express").RequestHandler} */
export async function createTodo(req, res, next) {
  try {
    const { task, description } = req.body;
    //   console.log(req.body);

    //   now save these fields into the db
    const todo = await TodoModel.create({ task, description });

    return res.status(200).json({ message: "todo created succesfully", todo });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
}

/** @type {import("express").RequestHandler} */
export async function fetchTodos(req, res, next) {
  try {
    const todos = await TodoModel.find();

    return res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
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
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
}
