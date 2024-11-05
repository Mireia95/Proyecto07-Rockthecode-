const mongoose = require('mongoose');

//creo schema
const funkoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    number: { type: Number },
    price: { type: Number, required: true },
    year: { type: Number },
    category: [
      { type: String, enum: ['Movies', 'Games', 'Series', 'Anime', 'Heroes'] }
    ],
    subcategory: { type: String }
  },
  {
    timestamps: true,
    collection: 'funkos'
  }
);

//creo modelo
const Funko = mongoose.model('funkos', funkoSchema, 'funkos');

//exporto moodelo
module.exports = Funko;
