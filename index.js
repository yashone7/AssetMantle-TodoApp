import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { connectDB } from "./db/db.js";
import api from "./routes/api.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

connectDB();

const PORT = process.env.PORT || 5005;

app.get("/", (req, res, next) => {
  return res.send("welcome to todo app backend");
});

app.use("/api", api);

app.listen(PORT, () => console.log(`app running on PORT ${chalk.blue(PORT)}`));
