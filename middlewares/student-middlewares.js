import { body } from "express-validator";
import { validateValues } from "./validate-values.js";
import { handleErrors } from "./handle-errors.js";
import { studentFields } from "../helpers/student-fields.js";

export const createStudentValidator = async (req, res, next) => {
  const isMulti = req.body.multi === true || req.body.multi === "true";

  const validations = [
    body("multi").optional().toBoolean().isBoolean(),
    ...(isMulti
      ? [
          body("students")
            .isArray({ min: 1 })
            .withMessage("Debe enviar al menos un estudiante"),
          ...studentFields("students.*.")
        ]
      : studentFields()),
  ];

  for (const validation of validations) {
    await validation.run(req);
  }

  try {
    validateValues(req, res, next);
  } catch (err) {
    // Si ocurre un error, pásalo correctamente a handleErrors
    return handleErrors(err, req, res, next);
  }
};
