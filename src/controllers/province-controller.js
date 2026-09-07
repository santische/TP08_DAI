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
      /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Obtener una provincia por ID'
        #swagger.description = 'Retorna una provincia específica utilizando su identificador.'

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID de la provincia que se desea consultar.',
            required: true,
            type: 'integer'
        }

        #swagger.responses[200] = {
            description: 'Provincia encontrada correctamente.',
            schema: {
                $ref: '#/definitions/Province'
            }
        }

        #swagger.responses[404] = {
            description: 'Provincia no encontrada.'
        }

        #swagger.responses[500] = {
            description: 'Error interno del servidor.'
        }
    */
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

    /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Crear una provincia'
        #swagger.description = 'Crea una nueva provincia utilizando los datos enviados en el cuerpo de la solicitud.'

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/definitions/Province'
                    }
                }
            }
        }

        #swagger.responses[201] = {
            description: 'Provincia creada correctamente.'
        }

        #swagger.responses[400] = {
            description: 'Datos incorrectos o error de validación.'
        }

        #swagger.responses[500] = {
            description: 'Error interno del servidor.'
        }
    */

    try {
        const province = req.body;
        await service.createAsync(province);
        return res.status(201).send("Provincia creada correctamente.");
    } catch (error) {
        return res.status(400).send(error.message);
    }
});


ProvinceRouter.put("/", async (req, res) => {

    /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Actualizar una provincia'
        #swagger.description = 'Actualiza los datos de una provincia utilizando la información enviada en el cuerpo de la solicitud.'

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/definitions/Province'
                    }
                }
            }
        }

        #swagger.responses[200] = {
            description: 'Provincia actualizada correctamente.'
        }

        #swagger.responses[400] = {
            description: 'Datos incorrectos o error de validación.'
        }

        #swagger.responses[404] = {
            description: 'Provincia no encontrada.'
        }

        #swagger.responses[500] = {
            description: 'Error interno del servidor.'
        }
    */
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

     /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Eliminar una provincia'
        #swagger.description = 'Elimina una provincia utilizando su identificador.'

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID de la provincia que se desea eliminar.',
            required: true,
            type: 'integer'
        }

        #swagger.responses[200] = {
            description: 'Provincia eliminada correctamente.'
        }

        #swagger.responses[404] = {
            description: 'Provincia no encontrada.'
        }

        #swagger.responses[500] = {
            description: 'Error interno del servidor.'
        }
    */
    const { id } = req.params;
    const deleted = await service.deleteAsync(id);

    if (!deleted) {
        return res.status(404).send("Provincia no encontrada.");
    }

    return res.status(200).send("Provincia eliminada correctamente.");
});

export default ProvinceRouter;