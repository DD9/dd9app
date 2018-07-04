const mongoose = require('mongoose');
const User = mongoose.model('User');
const Company = mongoose.model('Company');
const TimeEntry = mongoose.model('TimeEntry');

exports.filter = (req, res) => {
  if (req.user.admin > 4) {

  }
  res.json(req.user)
  //res.render('index/sample', {user: req.user});
};

exports.user = async (req, res) => {
  const user = await User.findOne({ email: 'conner@dd9.com'}).populate('companyId');
  res.json(user)
};

exports.timeEntry = async (req, res) => {
  const timeEntry = await TimeEntry.findOne({ _id: '100001000000000000000000'}).populate('userId companyId publicUserId publicCompanyId');
  res.json(timeEntry)
};