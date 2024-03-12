const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  farm: String,
  block: String,
  plot: String,
  area: Number,
  season: String,
  rowspace: Number,
  variety: String,
  email: String,
  date: Date
});

const Plot = mongoose.model('Plot', plotSchema);

module.exports = Plot;
