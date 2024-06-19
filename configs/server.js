"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiLimiter } from "../src/middlewares/validar-cant-peticiones.js";
import { dbConnection } from "./mongo.js";
import Project from "../src/projects/project.model.js";
import projectRoutes from "../src/projects/project.routes.js";
import studentRoutes from '../src/student/student.routes.js'

export class ExpressServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.projectPath = "/randomProject/v2";

    this.middlewares();
    this.conectarDB();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //this.app.use(express.urlencoded({ extends: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(apiLimiter);
  }

  routes() {
    this.app.use(this.projectPath, projectRoutes);
    this.app.use(this.projectPath, studentRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
