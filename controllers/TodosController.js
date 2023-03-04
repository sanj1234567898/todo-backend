import jwt from "jsonwebtoken";
import TodosModel from "../models/TodosModel.js";
import TodoModel from "../models/TodosModel.js";

export const create = async (req, res) => {
  try {
    const doc = new TodoModel({
      text: req.body.text,
      user: req.userId,
    });

    const todo = await doc.save();

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось создать тудушку",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    TodoModel.findByIdAndRemove(
      {
        _id: postId,
      },
      (error, doc) => {
        if (error) {
          return res.status(500).json({
            message: "Не удалось удалить тудушку",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Тудушка не найдена",
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Не удалось удалить тудушку",
    });
  }
};
export const getAllByUser = async (req, res) => {
  try {
    const userId = jwt.decode(req.params.id, "qwerty");

    const doc = await TodoModel.find({ user: userId });

    if (!doc) {
      return res.status(404).json({
        message: "Тудушки не найдены",
      });
    }

    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: "Тудушки не найдены" });
  }
};
export const patch = async (req, res) => {
  try {
    const postId = req.body.id;
    const todo = await TodoModel.findById(postId);

    todo.text = req.body.text;
    todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось обновить статью" });
  }
};
export const completed = async (req, res) => {
  try {
    const postId = req.body.id;
    const todo = await TodoModel.findById(postId);

    todo.completed = !todo.completed;
    todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось обновить статью" });
  }
};
