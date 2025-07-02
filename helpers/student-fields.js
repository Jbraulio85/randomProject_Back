// helpers/student-fields.js
// Campos y validaciones reutilizables para estudiantes

import { body } from "express-validator";
import { validateSection } from "../utils/validators.js";


export const validSections = [
  "IN6AM", "IN6AV", "IN6BM", "IN6BV", "IN6CM", "IN6CV"
];

export const studentFields = (prefix = "") => [
  body(`${prefix}studentId`)
    .exists({ checkFalsy: true }).withMessage("El número de carnet es obligatorio")
    .isString().withMessage("El número de carnet debe ser texto")
    .isLength({ min: 7, max: 7 }).withMessage("El número de carnet debe tener 7 dígitos")
    .matches(/^\d{7}$/).withMessage("El número de carnet debe ser numérico de 7 dígitos"),
  body(`${prefix}name`)
    .exists({ checkFalsy: true }).withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser texto")
    .isLength({ max: 35 }).withMessage("El nombre no puede exceder los 35 caracteres"),
  body(`${prefix}surname`)
    .exists({ checkFalsy: true }).withMessage("El apellido es obligatorio")
    .isString().withMessage("El apellido debe ser texto")
    .isLength({ max: 35 }).withMessage("El apellido no puede exceder los 35 caracteres"),
  body(`${prefix}email`).optional().isEmail().withMessage("El correo debe ser válido"),
  body(`${prefix}section`).custom((value) => validateSection(value, validSections)),
];
