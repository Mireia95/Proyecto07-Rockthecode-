const Funko = require('../../api/models/funko');
const funkosSeed = require('../../data/funkos');
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://RTC_Proyecto07:tfJds9kXEUWtmuST@cluster0.g9js5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(async () => {
    //busco tods los funkos
    const allFunkos = Funko.find();

    //si hay, los elimino
    if (allFunkos.length > 0) {
      await Funko.collection.drop();
    }
  })
  .catch((error) =>
    console.log(`Error en eliminar los datos de la coleccion: ${error}`)
  )
  .then(async () => {
    //subimos datos de la semilla
    await Funko.insertMany(funkosSeed);
    console.log('Datos subidos con éxito a la BBDD');
  })
  .catch((error) => {
    console.log(`Error en subir nuevos datos de la semilla: ${error}`);
  })
  .finally(() => {
    mongoose.disconnect();
    console.log('BBDD desconectada!');
  });
