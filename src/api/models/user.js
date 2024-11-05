const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true }, //no pongo unique:true porque lo controlo desde el controller (si ya existe o no), asi devuelvo el error que quiero
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
    },
    favouriteFunkos: [{ type: mongoose.Types.ObjectId, ref: 'funkos' }]
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

//para encriptar la contraseña del user uso bcrypt
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;
