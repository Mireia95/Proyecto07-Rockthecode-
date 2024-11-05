const { generateSign } = require('../../utils/jwt');
const Funko = require('../models/funko');
const User = require('../models/user');
const bcrypt = require('bcrypt');

//petición POST para register
const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'user' //paso por defecto el role user. Si queremos admin será modificar user por BBDD
    });

    //chequeo si ya existe el user. Si existe devuelvo error, porque no se puede hacer el register (sería login)
    const userDuplicated = await User.findOne({ username: req.body.username });
    const mailDuplicated = await User.findOne({ email: req.body.email });

    if (userDuplicated) {
      return res.status(400).json('Ese username ya existe. Poner otro');
    }

    if (mailDuplicated) {
      return res.status(400).json('Ese email ya existe.');
    }

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json(`Error en el register: ${error}`);
  }
};

//petición POST para login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate('favouriteFunkos'); //populo el campo favouritefunkos si hay

    //compruebo si el user ya existe
    //si NO existe, envio error
    if (!user) {
      return res.status(400).json('Error, usuario o contraseña incorrectos');
    }

    //si el user existe, entonces compruebo password
    if (bcrypt.compareSync(password, user.password)) {
      //si el password coincide, genero el token para user, que sirve para otras peticiones que requieren el token
      const token = generateSign(user._id);
      return res.status(200).json({ user, token }); //imprimo token para poder usarlo en insomnia luego y probar peticiones con middlewares
    }
  } catch (error) {
    return res.status(400).json(`Error en la petición LOGIN: ${error}`);
  }
};

//petición DELETE: solo para admin.
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ mensaje: 'El usuario eliminado está eliminado', deletedUser });
  } catch (error) {
    return res.status(400).json('Error en la petición DELETE');
  }
};

//peticiàon DELETE: permite eliminar solo el usuario que hace la petición
const deleteMyUser = async (req, res, next) => {
  try {
    const idUser = req.user._id; //id del user que hace la petición
    const { id } = req.params; //id de la request, en la URL
    //compruebo que el id del user sea el mismo del que quiero eliminar, para que pueda eliminarse a si mismo, y no eliminar a otros
    if (id === idUser.toString()) {
      const deletedUser = await User.findByIdAndDelete(id);
      return res.status(200).json({
        mensaje: 'Tu usuario ha sido eliminado con éxito',
        deletedUser
      });
    } else {
      return res
        .status(400)
        .json(
          'No tienes permisos para eliminar este user. Solo puedes eliminar a tu user'
        );
    }
  } catch (error) {
    return res.status(400).json('Error en la petición DELETE');
  }
};

//petición GET USERS: solo para admin.
const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate('favouriteFunkos');
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//petición PUT: solo para admin
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = new User(req.body);
    newUser._id = id;
    const userUpdate = await User.findByIdAndUpdate(id, newUser, { new: true });
    return res.status(200).json(userUpdate);
  } catch (error) {
    return res.status(400).json('Error en la petición PUT');
  }
};

//petición PUT: actualizar mi propio user, solo el campo favouriteFunkos
const updateFavouriteFunkos = async (req, res, next) => {
  try {
    const idUser = req.user._id; //id del user que hace la petición
    const { id } = req.params; //id de la request, en la URL

    //compruebo que el id del user sea el mismo del que quiero actualizar, para que no pueda actualizar a otros users
    if (id === idUser.toString()) {
      const newUser = new User({
        favouriteFunkos: req.body.favouriteFunkos
      });

      newUser._id = id;
      newUser.favouriteFunkos = [
        ...req.user.favouriteFunkos,
        ...req.body.favouriteFunkos
      ];

      //no funkos favoritos duplicados!
      for (let i = 0; i < newUser.favouriteFunkos.length; i++) {
        const funko1 = newUser.favouriteFunkos[i]._id.toString();
        for (let j = i + 1; j < newUser.favouriteFunkos.length; j++) {
          const funko2 = newUser.favouriteFunkos[j]._id.toString();
          if (funko1 === funko2) {
            newUser.favouriteFunkos.splice(j, 1);
            j--;
            console.log(
              'Estás poniendo en favorito un funko que ya está marcado como favorito'
            );
          }
        }
      }

      const userUpdate = await User.findByIdAndUpdate(id, newUser, {
        new: true
      }).populate('favouriteFunkos');
      return res.status(200).json({
        mensaje: 'Has añadido funkos favoritos',
        userUpdate
      });
    } else {
      return res
        .status(400)
        .json('No tienes permisos para añadir funkos favoritos');
    }
  } catch (error) {
    return res
      .status(400)
      .json(`Error en la petición PUT en actualizar el user: ${error}`);
  }
};

module.exports = {
  register,
  login,
  deleteUser,
  deleteMyUser,
  getUsers,
  updateUser,
  updateFavouriteFunkos
};
