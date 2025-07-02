import { Router } from "express";
import { createStudentValidator } from "../../middlewares/student-middlewares.js";
import { createStudent } from "./student.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Students
 *     description: Gestión de estudiantes
 */

/**
 * @swagger
 * /randomProject/v2/createStudent:
 *   post:
 *     summary: Crea uno o varios estudiantes
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               section:
 *                 type: string
 *               multi:
 *                 type: boolean
 *               students:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     section:
 *                       type: string
 *     responses:
 *       200:
 *         description: Estudiante(s) agregado(s) exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                 project:
 *                   type: object
 *                   nullable: true
 *       500:
 *         description: Error al crear el estudiante
 */

// Usar el middleware dinámico (no como array)
router.post(
    "/createStudent",
    createStudentValidator,
    createStudent
);

export default router;

