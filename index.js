import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" with { type: "json" };

import ProvinceRouter from "./src/controllers/province-controller.js";

const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API
app.use("/api/province", ProvinceRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});