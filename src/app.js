require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
const userRoutes = require('./routes/users');
const dataRoutes = require('./routes/data');
app.use('/users', userRoutes);
app.use('/data', dataRoutes);


// Servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
