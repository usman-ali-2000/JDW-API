const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  email: String,
  category: String,
  product: String,
  qty: Number,
  unit: String,
  date: Date
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
