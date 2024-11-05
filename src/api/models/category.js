const mongoose = require('mongoose');

//creo schema
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    funkos: [{ type: mongoose.Types.ObjectId, ref: 'funkos' }]
  },
  {
    timestamps: true,
    collection: 'categories'
  }
);

//creo modelo
const Category = mongoose.model('categories', categorySchema, 'categories');

//exporto moodelo
module.exports = Category;
