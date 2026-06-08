import express  from "express"; 
import cors     from "cors"; 
import ProvinceRouter from "./src/controllers/province-controller.js" 

const app  = express(); 
const port = 3001;

// Agrego los Middlewares 
app.use(cors());         // Middleware de CORS. 
app.use(express.json()); // Middleware para parsear y comprender JSON. 

// 
// Endpoints (todos los Routers) 
// 
app.use("/api/province", ProvinceRouter);
app.get('/test', (req, res) => {
    res.send('OK');
});
//
// Inicio el Server y lo pongo a escuchar. 
// 
console.log("Llego hasta aca");
app.listen(port, () => {     
    console.log(`Example app listening on port ${port}`) 
})



