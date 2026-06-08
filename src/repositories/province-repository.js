import { Client } from "pg";
import DBConfig from "../configs/db-config.js";

export default class ProvinceRepository {

    //Aca traigo a todas las provincias
   getAllAsync = async () => {

       let returnArray = [];

       const client = new Client(DBConfig);

       try {

           await client.connect();
           const sql = "SELECT * FROM provincias";
           const result = await client.query(sql);
           returnArray = result.rows;

       } catch (error) {
           console.log(error);
       } finally {
           await client.end();
       }

       return returnArray;
   }


   //Aca nada mas traigo la provincia por ID
   getByIdAsync = async (id) => {
      let returnEntity = null;

    const client = new Client(DBConfig);
   
    try {

        await client.connect();
        const sql = "SELECT * FROM provincias WHERE id = $1";
        const values = [id];
        const result = await client.query(sql, values);
        if (result.rows.length > 0) {
            returnEntity = result.rows[0];
        }

    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }

    return returnEntity;
}

createAsync = async (province) => {

    const client = new Client(DBConfig);

    try {

        await client.connect();

        const sql = `
            INSERT INTO provincias
            (nombre, nombrecompleto, latitud, longitud, displayorder)
            VALUES ($1, $2, $3, $4, $5)
        `;

        const values = [
            province.name,
            province.full_name,
            province.latitude,
            province.longitude,
            province.display_order
        ];

        await client.query(sql, values);

        return province;

    } catch (error) {
    console.log(error);
    throw error;
} finally {
        await client.end();
    }
}
}

