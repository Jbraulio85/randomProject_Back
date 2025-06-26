import { body } from "express-validator";
import { validateValues } from "../middlewares/validate-values.js";
import { handleErrors } from "../middlewares/handle-errors.js";

const studentFields = [
  body("studentId")
    .notEmpty()
    .withMessage("El número de carnet es obligatorio")
    .isInt()
    .withMessage("El número de carnet debe ser numérico")
    .isLength({ min: 7, max: 7 })
    .withMessage("El número de carnet debe tener 7 dígitos"),
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser texto")
    .isLength({ max: 35 })
    .withMessage("El nombre no puede exceder los 35 caracteres"),
  body("surname")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isString()
    .withMessage("El apellido debe ser texto")
    .isLength({ max: 35 })
    .withMessage("El apellido no puede exceder los 35 caracteres"),
  body("email").optional().isEmail().withMessage("El correo debe ser válido"),
  body("section")
    .notEmpty()
    .withMessage("La sección es obligatoria")
    .isIn(["IN6AM", "IN6AV", "IN6BM", "IN6BV", "IN6CM", "IN6CV"])
    .withMessage("La sección no es válida"),
];

export const createStudentValidator = [
  body("multi").optional().isBoolean(),
  body("students")
    .if(body("multi").equals(true))
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos un estudiante"),
  ...studentFields.map((field) => field.if(body("multi").not().equals(true))),
  body("students.*.studentId")
    .if(body("multi").equals(true))
    .notEmpty()
    .withMessage("El número de carnet es obligatorio")
    .isInt()
    .withMessage("El número de carnet debe ser numérico")
    .isLength({ min: 7, max: 7 })
    .withMessage("El número de carnet debe tener 7 dígitos"),
  body("students.*.name")
    .if(body("multi").equals(true))
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser texto")
    .isLength({ max: 35 })
    .withMessage("El nombre no puede exceder los 35 caracteres"),
  body("students.*.surname")
    .if(body("multi").equals(true))
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isString()
    .withMessage("El apellido debe ser texto")
    .isLength({ max: 35 })
    .withMessage("El apellido no puede exceder los 35 caracteres"),
  body("students.*.email")
    .if(body("multi").equals(true))
    .optional()
    .isEmail()
    .withMessage("El correo debe ser válido"),
  body("students.*.section")
    .if(body("multi").equals(true))
    .notEmpty()
    .withMessage("La sección es obligatoria")
    .isIn(["IN6AM", "IN6AV", "IN6BM", "IN6BV", "IN6CM", "IN6CV"])
    .withMessage("La sección no es válida"),
  validateValues,
  handleErrors,
];
