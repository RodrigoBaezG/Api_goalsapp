const initOptions = {};
const pgp = require('pg-promise')(initOptions);

const connectionString = process.env.DATABASE_URL;

const config = connectionString 
    ? {
        connectionString: connectionString,
        // CLAVE: Configuración SSL necesaria para conectar a Render PostgreSQL desde tu servicio Express.
        ssl: {
            rejectUnauthorized: false, 
        },
    } 
    : {
        // Fallback para desarrollo local (usando las variables separadas o localhost)
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost', // O process.env.DB_HOST
        port: 5432,
        database: 'goalsapp',
    };;

const db = pgp(config);

module.exports = db;