const { isAdmin } = require('../../middlewares/isAuth');
const {
  postCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getByIdCategory
} = require('../controllers/category');

const categoryRoutes = require('express').Router();

//declaro rutas
categoryRoutes.get('/:id', getByIdCategory);
categoryRoutes.get('/', getCategories);
categoryRoutes.post('/', isAdmin, postCategory); //solo los admin pueden subir nuevas categorias
categoryRoutes.put('/:id', isAdmin, updateCategory); //solo los admin pueden actualizar categorias
categoryRoutes.delete('/:id', isAdmin, deleteCategory); //solo los admin pueden eliminar categorias

//exporto rutas
module.exports = categoryRoutes;
