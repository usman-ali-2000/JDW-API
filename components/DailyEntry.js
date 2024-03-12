const mongoose = require('mongoose');

const dailyEntrySchema = new mongoose.Schema({
  id: String,
  farm: String,
  plot: String,
  area: String,
  stage: String,
  type: String,
  deal: String,
  time: String,
  mean: String,
  fuel: String,
  person: String,
  quantity: String,
  moga: String,
  units: String,
  email: String,
  date: Date
});

const DailyEntry = mongoose.model('DailyEntry', dailyEntrySchema);

module.exports = DailyEntry;
