const mongoose = require('mongoose');

const varietySchema = new mongoose.Schema({
  email: String,
  variety: String,
  date: Date
});

const Variety = mongoose.model('Variety', varietySchema);

module.exports = Variety;
