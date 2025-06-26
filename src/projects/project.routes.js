import { Router } from "express";
import { projectValidator, assignProjectValidator } from "../../helpers/project-middlewares.js";
import * as projectCtrl from "./project.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Gestión de proyectos
 */

/**
 * @swagger
 * /randomProject/v2/createProject:
 *   post:
 *     summary: Crea un nuevo proyecto
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               repositoryBack:
 *                 type: string
 *               repositoryFront:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proyecto agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                 project:
 *                   type: object
 *       500:
 *         description: Error al crear el proyecto
 */
router.post(
    "/createProject",
    projectValidator,
    projectCtrl.createProject
)

/**
 * @swagger
 * /randomProject/v2/getMyProject:
 *   post:
 *     summary: Asigna un proyecto aleatorio a un estudiante
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proyecto asignado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                 project:
 *                   type: object
 *       404:
 *         description: No hay proyectos disponibles
 *       500:
 *         description: Error al asignar el proyecto
 */
router.post(
    "/getMyProject",
    assignProjectValidator,
    projectCtrl.asignProject
)

export default router;

