import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "RandomProject API",
            version: "1.0.0",
            description: "API-Resful para RandomProject: Gestión de proyectos y estudiantes.",
            contact: {
                name: "Braulio Echeverria",
                email: "braulioecheveria@kinal.org.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3000/randomProject/v2/",
            }
        ],
        tags: [
            { name: "Projects", description: "Gestión de proyectos" },
            { name: "Students", description: "Gestión de estudiantes" }
        ]
    },
    apis: [
        "./src/projects/*.js",
        "./src/student/*.js"
    ]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
