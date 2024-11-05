require('dotenv').config(); //para conectarme a la BBDD
//traigo libreria express
const express = require('express');
const { connectDB } = require('./src/config/db');
const funkoRoutes = require('./src/api/routes/funko');
const categoryRoutes = require('./src/api/routes/category');
const userRoutes = require('./src/api/routes/user');

const app = express();

//conecto a la BBDD
connectDB();

//para que el servidor reciba y procese datos en formato json
app.use(express.json());

//ruta para llamar todas las peticiones de coleccion funko
app.use('/api/v1/funkos', funkoRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/users', userRoutes);

//creo ruta generica per error "ruta not found"
app.use('*', (req, res, next) => {
  return res.status(400).json('Route not found');
});

//levanto el servidor
app.listen(3000, () => {
  console.log(
    'Has levantado el servidor con éxito en http://localhost:3000 😊'
  );
});
