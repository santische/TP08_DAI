import { Router } from "express";
import ProvinceService from "../services/province-service.js";


const ProvinceRouter = Router();
const service = new ProvinceService();


ProvinceRouter.get("/", async (req, res) => {   /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Obtener todas las provincias'
        #swagger.description = 'Retorna una lista con todas las provincias almacenadas en la base de datos.'

        #swagger.responses[200] = {
            description: 'Listado de provincias obtenido correctamente.',
            schema: {
                type: 'array',
                items: {
                    $ref: '#/definitions/Province'
                }
            }
        }
    */    const provinces = await service.getAllAsync();
    res.status(200).json(provinces);
});


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


ProvinceRouter.post("/", async (req, res) => {
    try {
        const province = req.body;
        await service.createAsync(province);
        return res.status(201).send("Provincia creada correctamente.");
    } catch (error) {
        return res.status(400).send(error.message);
    }
});


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


ProvinceRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deleted = await service.deleteAsync(id);

    if (!deleted) {
        return res.status(404).send("Provincia no encontrada.");
    }

    return res.status(200).send("Provincia eliminada correctamente.");
});

export default ProvinceRouter;