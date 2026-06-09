import { Client } from "pg";
import DBConfig from "../configs/db-config.js";
import LogHelper from "../helpers/log-helper.js";

// El repository es el único lugar de la aplicación que habla con la base de datos.
// Nadie más hace consultas SQL. Si mañana cambiás la base, solo tocás este archivo.
// Cada método abre su propia conexión, hace la consulta, y la cierra en el finally.
// El "finally" se ejecuta SIEMPRE, haya error o no, para asegurarnos de cerrar la conexión.

export default class ProvinceRepository {

    // ─────────────────────────────────────────────
    // Trae todas las provincias de la base de datos.
    // Devuelve un array (puede estar vacío si no hay filas).
    // ─────────────────────────────────────────────
    getAllAsync = async () => {
        let returnArray = [];
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = "SELECT * FROM provincias";
            const result = await client.query(sql);
            returnArray = result.rows;

        } catch (error) {
            LogHelper.logError(error);
            throw error;
        } finally {
            await client.end();
        }

        return returnArray;
    }

    // ─────────────────────────────────────────────
    // Trae una sola provincia por su id.
    // Devuelve el objeto si lo encontró, o null si no existe.
    // ─────────────────────────────────────────────
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
            LogHelper.logError(error);
            throw error;
        } finally {
            await client.end();
        }

        return returnEntity;
    }

    // ─────────────────────────────────────────────
    // Inserta una nueva provincia en la base de datos.
    // Devuelve la fila insertada con el id generado por la base.
    // ─────────────────────────────────────────────
    createAsync = async (province) => {
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = `
                INSERT INTO provincias (nombre, nombrecompleto, latitud, longitud, displayorder)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;
            const values = [
                province.name,
                province.full_name,
                province.latitude,
                province.longitude,
                province.display_order
            ];

            const result = await client.query(sql, values);
            return result.rows[0];

        } catch (error) {
            LogHelper.logError(error);
            throw error;
        } finally {
            await client.end();
        }
    }

    // ─────────────────────────────────────────────
    // Actualiza una provincia existente.
    // Devuelve la fila actualizada, o null si no encontró el id.
    // ─────────────────────────────────────────────
    updateAsync = async (province) => {
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = `
                UPDATE provincias
                SET nombre         = $1,
                    nombrecompleto = $2,
                    latitud        = $3,
                    longitud       = $4,
                    displayorder   = $5
                WHERE id = $6
                RETURNING *
            `;
            const values = [
                province.name,
                province.full_name,
                province.latitude,
                province.longitude,
                province.display_order,
                province.id
            ];

            const result = await client.query(sql, values);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0];

        } catch (error) {
            LogHelper.logError(error);
            throw error;
        } finally {
            await client.end();
        }
    }

    // ─────────────────────────────────────────────
    // Elimina una provincia por su id.
    // Devuelve true si la eliminó, o null si no encontró el id.
    // ─────────────────────────────────────────────
    deleteAsync = async (id) => {
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = "DELETE FROM provincias WHERE id = $1 RETURNING *";
            const values = [id];
            const result = await client.query(sql, values);

            if (result.rows.length === 0) {
                return null;
            }

            return true;

        } catch (error) {
            LogHelper.logError(error);
            throw error;
        } finally {
            await client.end();
        }
    }
}