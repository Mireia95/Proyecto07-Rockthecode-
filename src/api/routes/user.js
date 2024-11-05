const { isAdmin, isAuth } = require('../../middlewares/isAuth');
const {
  login,
  getUsers,
  register,
  deleteUser,
  updateUser,
  deleteMyUser,
  updateFavouriteFunkos
} = require('../controllers/user');

const userRoutes = require('express').Router();

//declaro rutas
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/', isAdmin, getUsers); //solo los admin pueden ver todos los usuarios
userRoutes.delete('/:id', isAdmin, deleteUser); //solo los admin pueden eliminar users
userRoutes.delete('/id/:id', isAuth, deleteMyUser); //el user se puede eliminar a si mismo (tiene que estar logueado)
userRoutes.put('/favourite-funkos/:id', isAuth, updateFavouriteFunkos); //actualizar el campo favourite funkos, pero solo del user que hace peticion (no de otros users)
userRoutes.put('/:id', isAdmin, updateUser); //solo los admin pueden actualizar datos de 1 user

//exporto rutas
module.exports = userRoutes;
