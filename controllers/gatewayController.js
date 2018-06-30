const mongoose = require('mongoose');
const Company = mongoose.model('Company');

exports.filter = (req, res) => {
  if (req.user.admin > 4) {

  }
  res.json(req.user)
  //res.render('index/sample', {user: req.user});
};

exports.user = (req, res) => {
  res.json(req.user)
};

exports.company = async (req, res) => {
  const company = await Company.findOne({ v1_id: 1}).populate('v1_company');
  console.log(company);
  res.json(company);
};