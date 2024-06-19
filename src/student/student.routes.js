import { Router } from "express";
import { createStudent } from "./student.controller.js";

const router = Router();

router.post(
    "/createStudent",
    createStudent
)

export default router;

