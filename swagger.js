import swaggerAutogen from "swagger-autogen";

// swaggerAutogen es la librería que lee tu código y genera automáticamente
// un archivo JSON con la documentación de todos tus endpoints.
// Ese archivo JSON después lo usa swagger-ui-express para mostrar la interfaz web.

const doc = {
    info: {
        title: "API Provincias",               // nombre de tu API
        description: "API REST para gestionar provincias argentinas"  // descripción
    },
    host: "localhost:3001",                    // dónde corre tu servidor
    basePath: "/api/province",
    schemes: ["http"],                         // protocolo que usás (http, no https)

    // Acá definís el modelo de una Provincia.
    // Esto le dice a Swagger cómo se ve el objeto que manejás.
    definitions: {
        Province: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    description: "ID autogenerado por la base de datos"
                },
                name: {
                    type: "string",
                    description: "Nombre corto de la provincia"
                },
                full_name: {
                    type: "string",
                    description: "Nombre completo de la provincia"
                },
                latitude: {
                    type: "number",
                    description: "Latitud geográfica"
                },
                longitude: {
                    type: "number",
                    description: "Longitud geográfica"
                },
                display_order: {
                    type: "integer",
                    description: "Orden de visualización"
                }
            }
        }
    }
};

// outputFile → dónde se guarda el archivo JSON generado
// endpointsFiles → qué archivos tiene que leer para encontrar los endpoints
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/controllers/province-controller.js"];

// Ejecuta swagger-autogen: lee el controller y genera el swagger-output.json
swaggerAutogen()(outputFile, endpointsFiles, doc);