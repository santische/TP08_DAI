import "dotenv/config"; 
import express from "express";
import cors    from "cors";
import ProvinceRouter from "./src/controllers/province-controller.js";

const app  = express();

const port = 3001;

// Los middlewares son funciones que se ejecutan ANTES de que llegue el request
app.use(cors());
app.use(express.json());


app.use("/api/province", ProvinceRouter);

//Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});