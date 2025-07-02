"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./db.js";
import { apiLimiter } from "../middlewares/request-limit.js";
import projectRoutes from "../src/projects/project.routes.js";
import studentRoutes from '../src/student/student.routes.js'
import { swaggerDocs, swaggerUi } from "./documentation.js";

const middlewares = (app) => {
  app.use(cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: ["Content-Type", "Authorization"],
        preflightContinue: false,
        optionsSuccessStatus: 204,
      }));
  app.use(express.json());
  app.use(helmet({
        crossOriginResourcePolicy: false,
        crossOriginEmbedderPolicy: false,
      }));
  app.use(morgan("dev"));
  app.use(apiLimiter);
  app.use("/randomProject/v2/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

const routes = (app) => {
  const basePath = "/randomProject/v2";
  app.use(basePath, projectRoutes);
  app.use(basePath, studentRoutes);
  app.use((req, res) => {
    res.status(404).json({ success: false, message: "Ruta no encontrada" });
  });
};

const conectarDB = async () => {
  try {
    await dbConnection();
  } catch (err) {
    console.warn(`Error al conectar con la base de datos: ${err.message}`);
    process.exit(1);
  }
};

export const initServer = async () => {
  const app = express();
  try {
    await conectarDB();
    middlewares(app);
    routes(app);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    );
  } catch (err) {
    console.error(`Error al iniciar el servidor: ${err.message}`);
    process.exit(1);
  }
};
