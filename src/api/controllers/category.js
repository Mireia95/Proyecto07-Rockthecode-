const Category = require('../models/category');

//petición GET
const getCategories = async (req, res, next) => {
  try {
    const allCategories = await Category.find().populate('funkos');
    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//petición GET BY ID
const getByIdCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//petición POST
const postCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (error) {
    return res.status(400).json('Error en la petición POST');
  }
};

//petición PUT
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldCategory = await Category.findById(id);
    const newCategory = new Category(req.body);
    newCategory._id = id;

    console.log(req.body.funkos);
    console.log(oldCategory.funkos);
    newCategory.funkos = [...oldCategory.funkos, ...req.body.funkos]; //sumo viejos favoritos con nuevos
    console.log(newCategory.funkos);
    //no duplicados, creo ciclo for para comparar funkos
    for (let i = 0; i < newCategory.funkos.length; i++) {
      const funko1 = newCategory.funkos[i]._id.toString();
      for (let j = i + 1; j < newCategory.funkos.length; j++) {
        const funko2 = newCategory.funkos[j]._id.toString();
        if (funko1 === funko2) {
          newCategory.funkos.splice(j, 1);
          j--;
          console.log('Estás añadiendo un funko que ya está añadido');
        }
      }
    }
    const updateCategory = await Category.findByIdAndUpdate(id, newCategory, {
      new: true
    });
    return res.status(200).json(updateCategory);
  } catch (error) {
    return res.status(400).json(`Error en la petición PUT: ${error}`);
  }
};

//petición DELETE
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.findByIdAndDelete(id);
    return res.status(200).json(deleteCategory);
  } catch (error) {
    return res.status(400).json('Error en la petición DELETE');
  }
};

//exporto peticiones
module.exports = {
  getCategories,
  getByIdCategory,
  updateCategory,
  postCategory,
  deleteCategory
};
