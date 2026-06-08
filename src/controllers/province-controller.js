import { Router } from "express";
import ProvinceService from "../services/province-service.js";

const ProvinceRouter = Router();
const service = new ProvinceService();

ProvinceRouter.get("/", async (req, res) => {

    const provinces = await service.getAllAsync();

    res.status(200).json(provinces);

});
ProvinceRouter.get("/:id", async (req, res) => {
    const { id } = req.params;  
    const provinces = await service.getByIdAsync(id);

    res.status(200).json(provinces);

});

ProvinceRouter.post("/", async (req, res) => {

    try {
        const province = req.body;
        const result = await service.createAsync(province);
        if (result) {
            return res.status(201).send('Created');
        }
        return res.status(500).send('Error interno al insertar.');
    }catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
}

});

export default ProvinceRouter;