import { Router } from "express";
import { projectValidator } from "../middlewares/post-project-validator.js";
import { createProject } from "./project.controller.js";

const router = Router();

router.post(
    "/createProject",
    projectValidator,
    createProject
)

export default router;

