import { Router } from "express";
import { projectValidator } from "../middlewares/post-project-validator.js";
import { asignProject, createProject } from "./project.controller.js";

const router = Router();

router.post(
    "/createProject",
    projectValidator,
    createProject
)

router.post(
    "/getMyProject",
    asignProject
)

export default router;

