const jwt = require('jsonwebtoken');

//funcion para generar el token
const generateSign = (id, email) => {
  //le paso el id como parametro, que será el id del user, para generar su token que tendrá a su vez el mismo id
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

//funcion para verificar si el token es correcto
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateSign, verifyToken };
