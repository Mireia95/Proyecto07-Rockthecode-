const Funko = require('../models/funko');

//petición GET
const getFunkos = async (req, res, next) => {
  try {
    const allFunkos = await Funko.find();
    return res.status(200).json(allFunkos);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//petición GET BY ID
const getByIdFunko = async (req, res, next) => {
  try {
    const { id } = req.params;
    const funko = await Funko.findById(id);
    return res.status(200).json(funko);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//petición POST
const postFunko = async (req, res, next) => {
  try {
    const newFunko = new Funko(req.body);
    const savedFunko = await newFunko.save();
    return res.status(201).json(savedFunko);
  } catch (error) {
    return res.status(400).json('Error en la petición POST');
  }
};

//petición PUT
const updateFunko = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newFunko = new Funko(req.body);
    newFunko._id = id;
    const updateFunko = Funko.findByIdAnUpdate(id, newFunko, { new: true });
    return res.status(200).json(updateFunko);
  } catch (error) {
    return res.status(400).json('Error en la petición PUT');
  }
};

//petición DELETE
const deleteFunko = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteFunko = await Funko.findByIdAndDelete(id);
    return res.status(200).json(deleteFunko);
  } catch (error) {
    return res.status(400).json('Error en la petición DELETE');
  }
};

//exporto peticiones
module.exports = {
  getFunkos,
  getByIdFunko,
  updateFunko,
  postFunko,
  deleteFunko
};
