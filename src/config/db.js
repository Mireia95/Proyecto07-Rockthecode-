const mongoose = require('mongoose');

//funcion para conectarse a la BBDD
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Conectados a la BBDD 😉');
  } catch (error) {
    console.log('No se ha podido conectar a la BBDD 😢');
  }
};

module.exports = { connectDB };
