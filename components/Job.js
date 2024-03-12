const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    email: String,
    job: String,
    date: Date
  });
  
  const Job = mongoose.model('Job', jobSchema);
  
  module.exports = Job;
  