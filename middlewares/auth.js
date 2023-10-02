import { errorHandler } from "./errorHandler.js";
import chalk from "chalk";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/** @type {import("express").RequestHandler} */
export async function validateToken(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  // console.log(chalk.red(token));

  // verify if this token is valid or not

  const JWT_SECRET = process.env.JWT_SECRET;

  jwt.verify(token, JWT_SECRET, (err, obj) => {
    if (err) {
      return res.status(500).json({ message: "Invalid credentails" });
    }

    console.log(obj);
    next();
  });
}
