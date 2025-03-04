const mysql = require('mysql');
const config = require('../config/db.config');
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con MySQL.');
});


module.exports = connection;
