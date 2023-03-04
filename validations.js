import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const todosCreateValidation = [
  body("text", "Слишком мало текста").isLength({
    min: 5,
  }),
];

export const todosPatchValidation = [
  body("text", "Слишком мало текста").isLength({
    min: 5,
  }),
];

export const todosPatchCompleteValidation = [
  body("completed", "boolean").isBoolean(),
];
