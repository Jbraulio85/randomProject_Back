# Random Project Backend

API RESTful para la gestión y asignación aleatoria de proyectos y estudiantes en el Taller de Node.js.

## Características principales
- Asignación aleatoria de proyectos a estudiantes.
- Validaciones robustas con express-validator.
- Envío de correos automáticos usando Nodemailer y OAuth2 (Gmail).
- Documentación interactiva con Swagger (OpenAPI 3.0).
- Seguridad con Helmet, CORS y rate limiting.
- Modelos y controladores organizados por entidad.
- Soporte para carga individual y múltiple de estudiantes.

## Instalación
1. Clona el repositorio o descarga el código.
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo `.env` con la URI de tu base de datos MongoDB:
   ```env
   URI_MONGO=mongodb://localhost:27017/randomProject
   PORT=3000
   ```
4. Configura el archivo `account_transport.json` con tus credenciales de Gmail OAuth2 para el envío de correos.

## Uso
- Inicia el servidor en modo desarrollo:
  ```sh
  npm run dev
  ```
- O en modo producción:
  ```sh
  npm start
  ```

## Endpoints principales
- `POST /randomProject/v2/createStudent` — Crea uno o varios estudiantes.
- `POST /randomProject/v2/createProject` — Crea un nuevo proyecto.
- `POST /randomProject/v2/getMyProject` — Asigna un proyecto aleatorio a un estudiante y envía correo.

Consulta la documentación Swagger en:
```
http://localhost:3000/randomProject/v2/api-docs
```

## Tecnologías utilizadas
- Node.js, Express, Mongoose
- Nodemailer (OAuth2 Gmail)
- Swagger (swagger-jsdoc, swagger-ui-express)
- Helmet, CORS, express-rate-limit

## Autor
Braulio Echeverria — braulioecheverria@kinal.edu.gt

---
> Proyecto desarrollado como parte del Taller de Node.js para la gestión académica de proyectos.
