import { check } from "express-validator";
import { validarCampos } from "./validar-campos.js";

export const projectValidator = [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("repositoryBack", "El repositorio del BackEnd es obligatorio").isURL(),
    check("repositoryFront", "El repositorio del FrontEnd es obligatorio").isURL(),
    validarCampos
]