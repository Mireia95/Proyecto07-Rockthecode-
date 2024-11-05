const User = require('../api/models/user');
const { verifyToken } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', ''); //quitar Bearer del token
    const { id } = verifyToken(token); //recupero el id del token, y verifico que esté bien. Si la verificación no va bien, peta y pasa directamente a catch.

    const user = await User.findById(id); //recupero el user que tiene ese id

    //paso los datos de ese user a req.user. Antes de hacerlo escondo el password, por seguridad
    user.password = null;
    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json('No estás autorizado.');
  }
};

//creo middleware que permita acceder a las peticiones solo en el caso de ser admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { id } = verifyToken(token);
    const user = await User.findById(id);

    //compruebo si el user es admin
    if (user.role === 'admin') {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res
        .status(400)
        .json('No tienes permisos de administrador para acceder.');
    }
  } catch (error) {
    return res.status(400).json(`Error. No estás autorizado: ${error}`);
  }
};

module.exports = { isAuth, isAdmin };
