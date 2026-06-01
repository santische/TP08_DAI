import 'dotenv/config';
import {Client} from "pg";

const DBConfig = {
host: process.env.DB_HOST,
port: process.env.DB_PORT,
database: process.env.DB_DATABASE,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD
};

export default DBConfig; 
