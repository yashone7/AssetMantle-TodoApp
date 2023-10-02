import { UserModel } from "../Models/userModel.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import bcrypt from "bcryptjs";
import chalk from "chalk";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import _ from "lodash";

/** @type {import("express").RequestHandler} */
export async function registerUser(req, res, next) {
  try {
    // here get the details from user and create a user in db
    // get user details -> req.body
    let { email, password, name } = req.body;

    // do not store passwords in plain text - always hash the passwords to prevent misusing passwords
    //  even in case of data breach

    // how to hash the passwords - use bcrypt

    // hashed password = salt + password

    // unique registration - TODO

    // check if the user already exists and then create the record

    let user = await UserModel.findOne({ email });

    if (!_.isEmpty(user)) {
      return res
        .status(400)
        .json({ message: "user with the email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);

    let hashedPassword = await bcrypt.hash(password, salt);

    password = hashedPassword;

    user = await UserModel.create({ email, password, name });

    return res.status(200).json({ user });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
}

/** @type {import("express").RequestHandler} */
// login user will generate the token/certificate
export async function loginUser(req, res, next) {
  try {
    // get the user details email, password
    // generate a token

    // 1. check if the user exists in the DB

    const { email, password, name } = req.body;

    const isValidUser = await UserModel.findOne({ email });

    if (_.isEmpty(isValidUser)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check if passwords are matching

    const isValidPassword = await bcrypt.compare(
      password,
      isValidUser.password
    );

    console.log(isValidPassword);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // console.log(chalk.blue(isValidUser));

    // finally if user exists and password is correct then sign the certificate and give it to user

    const payload = { email, name, isAuthenticated: true };

    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
}

/** @type {import("express").RequestHandler} */
export async function validateUserToken(req, res, next) {
  try {
    const { token } = req.params;

    const JWT_SECRET = process.env.JWT_SECRET;

    jwt.verify(token, JWT_SECRET, (err, obj) => {
      if (err) {
        return res.status(500).json({ message: "Invalid credentails" });
      }

      return res.status(200).json({ message: "token verified", token });
    });
  } catch (err) {}
}

export const userService = {
  registerUser,
  loginUser,
  validateUserToken,
};
