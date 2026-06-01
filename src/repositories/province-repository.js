import { Client } from "pg";
import DBConfig from "../configs/db-config.js";

export default class ProvinceRepository {

   getAllAsync = async () => {

       let returnArray = [];

       const client = new Client(DBConfig);

       try {

           await client.connect();

           const sql = "SELECT * FROM provinces";

           const result = await client.query(sql);

           returnArray = result.rows;

       } catch (error) {
           console.log(error);
       } finally {
           await client.end();
       }

       return returnArray;
   }
}
