import { Router } from "express";
import ProvinceService from "../services/province-service.js";

// Router es como un "mini-servidor" que agrupa rutas relacionadas.
// En el index.js lo conectamos con app.use("/api/province", ProvinceRouter)
// Así este router maneja todo lo que llegue a /api/province
const ProvinceRouter = Router();
const service = new ProvinceService();

// ─────────────────────────────────────────────
// GET /api/province
// Devuelve TODAS las provincias.
// Siempre responde 200 con un array (puede estar vacío).
// ─────────────────────────────────────────────
ProvinceRouter.get("/", async (req, res) => {
    const provinces = await service.getAllAsync();
    res.status(200).json(provinces);
});

// ─────────────────────────────────────────────
// GET /api/province/:id
// Devuelve UNA provincia por su id.
// Si no existe → 404 Not Found
// Si existe    → 200 OK con el objeto
// ─────────────────────────────────────────────
ProvinceRouter.get("/:id", async (req, res) => {
    // req.params contiene los parámetros de la URL, en este caso el :id
    const { id } = req.params;
    const province = await service.getByIdAsync(id);

    // Si el service devuelve null significa que no encontró nada
    if (!province) {
        return res.status(404).send("Provincia no encontrada.");
    }

    res.status(200).json(province);
});

// ─────────────────────────────────────────────
// POST /api/province
// Crea una nueva provincia.
// El body del request debe tener los datos de la provincia.
// Si hay error de validación (nombre vacío, etc.) → 400 Bad Request
// Si se creó bien → 201 Created
// ─────────────────────────────────────────────
ProvinceRouter.post("/", async (req, res) => {
    try {
        // req.body contiene el JSON que mandó el cliente
        // Funciona porque en index.js pusimos app.use(express.json())
        const province = req.body;
        await service.createAsync(province);
        return res.status(201).send("Provincia creada correctamente.");
    } catch (error) {
        // Si el service lanza un error (por validación u otro motivo),
        // lo atrapamos acá y devolvemos 400 con el mensaje del error
        return res.status(400).send(error.message);
    }
});

// ─────────────────────────────────────────────
// PUT /api/province
// Actualiza una provincia existente.
// El body debe incluir el id + los datos a modificar.
// Si no existe → 404 Not Found
// Si hay error de validación → 400 Bad Request
// Si se actualizó bien → 200 OK
// ─────────────────────────────────────────────
ProvinceRouter.put("/", async (req, res) => {
    try {
        const province = req.body;
        const updated = await service.updateAsync(province);

        if (!updated) {
            return res.status(404).send("Provincia no encontrada.");
        }

        return res.status(200).send("Provincia actualizada correctamente.");
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

// ─────────────────────────────────────────────
// DELETE /api/province/:id
// Elimina una provincia por su id.
// Si no existe → 404 Not Found
// Si se eliminó bien → 200 OK
// ─────────────────────────────────────────────
ProvinceRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deleted = await service.deleteAsync(id);

    if (!deleted) {
        return res.status(404).send("Provincia no encontrada.");
    }

    return res.status(200).send("Provincia eliminada correctamente.");
});

export default ProvinceRouter;