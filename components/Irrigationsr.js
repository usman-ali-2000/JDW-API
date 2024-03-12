const mongoose = require('mongoose');

const irrigationsrSchema = new mongoose.Schema({
  id: Number,
  email: String,
  source: String,
  date: Date
});

const Irrigationsr = mongoose.model('Irrigationsr', irrigationsrSchema);

module.exports = Irrigationsr;
