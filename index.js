import "dotenv/config"; 
import express from "express";
import cors    from "cors";
import ProvinceRouter from "./src/controllers/province-controller.js";

const app  = express();

// El puerto viene del .env si existe, sino usa 3000 como valor por defecto.
const port = 3001;

// ── Middlewares ───────────────────────────────────────────────────────────────
// Los middlewares son funciones que se ejecutan ANTES de que llegue el request
// a tu endpoint. Se aplican a todos los requests.

// cors() permite que otros dominios (ej: tu frontend) puedan llamar a esta API.
// Sin esto, el browser bloquea los requests que vienen de otro origen.
app.use(cors());

// express.json() lee el body del request y lo convierte en un objeto JavaScript.
// Sin esto, req.body en el controller sería undefined.
app.use(express.json());

// ── Routers ───────────────────────────────────────────────────────────────────
// Cada Router agrupa los endpoints de una entidad.
// Todo lo que llegue a /api/province lo maneja el ProvinceRouter.
app.use("/api/province", ProvinceRouter);

// ── Inicio del servidor ───────────────────────────────────────────────────────
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});