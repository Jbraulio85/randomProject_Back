import { body } from "express-validator";
import { validateValues } from "../middlewares/validate-values.js";
import { handleErrors } from "../middlewares/handle-errors.js";

export const projectValidator = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser texto"),
  body("repositoryBack")
    .notEmpty()
    .withMessage("El repositorio del BackEnd es obligatorio")
    .isString()
    .withMessage("El repositorio del BackEnd debe ser texto")
    .isURL()
    .withMessage("El repositorio del BackEnd debe ser una URL válida"),
  body("repositoryFront")
    .notEmpty()
    .withMessage("El repositorio del FrontEnd es obligatorio")
    .isString()
    .withMessage("El repositorio del FrontEnd debe ser texto")
    .isURL()
    .withMessage("El repositorio del FrontEnd debe ser una URL válida"),
  validateValues,
  handleErrors,
];

export const assignProjectValidator = [
  body("studentId")
    .notEmpty()
    .withMessage("El número de carnet es obligatorio")
    .isInt()
    .withMessage("El número de carnet debe ser numérico")
    .isLength({ min: 7, max: 7 })
    .withMessage("El número de carnet debe tener 7 dígitos"),
  validateValues,
  handleErrors,
];
