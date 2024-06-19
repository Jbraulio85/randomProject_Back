import { check } from "express-validator";
import { validarCampos } from "./validar-campos.js";

export const projectValidator = [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("repository", "El repositorio es obligatorio").isURL(),
    validarCampos
]