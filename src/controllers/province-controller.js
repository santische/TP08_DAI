import { Router } from "express";
import ProvinceService from "../services/province-service.js";

const router = Router();
const service = new ProvinceService();

router.get("/", async (req, res) => {

    const provinces = await service.getAllAsync();

    res.status(200).json(provinces);

});

export default router;