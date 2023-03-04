import express from "express";
import mongoose from "mongoose";
import * as TodosController from "./controllers/TodosController.js";
import * as UserController from "./controllers/UserController.js";
import CheckAuth from "./utils/CheckAuth.js";
import handleValidationResult from "./utils/handleValidationResult.js";
import {
  registerValidation,
  loginValidation,
  todosCreateValidation,
  todosPatchValidation,
  todosPatchCompleteValidation,
} from "./validations.js";
import cors from "cors";

const PORT = 4444;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://admin:qwerty12345@cluster0.qvchahz.mongodb.net/blog?retryWrites=true&w=majority`
  )
  .then(() => console.log(`connected to DB`))
  .catch((err) => console.log(`DB error ${err.message}`));

app.post(
  "/auth/register",
  registerValidation,
  handleValidationResult,
  UserController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationResult,
  UserController.login
);
app.get("/auth/me", CheckAuth, UserController.getMe);

app.post(
  "/todos",
  CheckAuth,
  todosCreateValidation,
  handleValidationResult,
  TodosController.create
);
app.get("/todos/:id", CheckAuth, TodosController.getAllByUser);
app.delete("/todos/:id", CheckAuth, TodosController.remove);
app.patch(
  "/todos",
  CheckAuth,
  todosPatchValidation,
  handleValidationResult,
  TodosController.patch
);
app.patch(
  "/todos/complete",
  CheckAuth,
  todosPatchCompleteValidation,
  handleValidationResult,
  TodosController.completed
);

app.listen(PORT, (err) => {
  err ? console.error(err) : console.log(`Server port ${PORT}'s started`);
});
