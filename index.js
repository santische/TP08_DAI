import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import ProvinceRouter from "./src/controllers/province-controller.js";

// createRequire nos permite importar el JSON generado por swagger-autogen
// ya que los archivos JSON no se pueden importar directamente con ES Modules
const require       = createRequire(import.meta.url);
const swaggerOutput = require("./swagger-output.json");

const app  = express();
const port = 3001;

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Swagger UI ────────────────────────────────────────────────────────────────
// Monta la interfaz de Swagger en /api-docs
// Ahí vas a poder ver y probar todos los endpoints desde el browser
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// ── Routers ───────────────────────────────────────────────────────────────────
app.use("/api/province", ProvinceRouter);

// ── Inicio del servidor ───────────────────────────────────────────────────────
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Swagger disponible en http://localhost:${port}/api-docs`);
});