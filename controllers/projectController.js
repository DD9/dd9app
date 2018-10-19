const mongoose = require('mongoose');

const Project = mongoose.model('Project');

exports.all = async (req, res) => {
  const companies = await Company.find().select('name status');
  res.json(companies);
};