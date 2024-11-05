const { isAuth, isAdmin } = require('../../middlewares/isAuth');
const {
  getFunkos,
  postFunko,
  updateFunko,
  deleteFunko,
  getByIdFunko
} = require('../controllers/funko');

const funkoRoutes = require('express').Router();

//declaro rutas
funkoRoutes.get('/:id', getByIdFunko);
funkoRoutes.get('/', getFunkos);
funkoRoutes.post('/', isAdmin, postFunko); //solo los admin pueden subir un nuevos funkos
funkoRoutes.put('/:id', isAdmin, updateFunko); //solo los admin pueden actualizar un funko
funkoRoutes.delete('/:id', isAdmin, deleteFunko); //solo los admin pueden eliminar un funko

//exporto rutas
module.exports = funkoRoutes;
