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

        database: 'goalsapp',
    };

const db = pgp(config);

module.exports = db;

