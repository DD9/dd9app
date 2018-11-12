const mongoose = require('mongoose');

const User = mongoose.model('User');
const ContractorHourLog = mongoose.model('ContractorHourLog');

exports.all = async (req, res) => {
  const users = await User.find().populate('company', 'name');
  res.json(users);
};

exports.active = async (req, res) => {
  const users = await User.find({ status: 'active' }).select('name').sort('name.first');
  res.json(users);
};

exports.one = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId }).populate('company', 'name');
  res.json(user);
};

exports.edit = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { 'name.first': req.body.firstName, 'name.last': req.body.lastName },
    { new: true },
  ).populate('company', 'name');
  await user.save();
  res.json(user);
};

exports.adminEdit = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      company: req.body.company,
      role: req.body.role,
      status: req.body.status,
      'name.first': req.body.firstName,
      'name.last': req.body.lastName,
    },
    { new: true },
  ).populate('company', 'name');

  await user.hourlyRate.pop();
  await user.hourlyRate.push({
    USD: req.body.hourlyRate,
  });

  await user.permissions.pop();
  if (req.body.role === 'admin') {
    await user.permissions.push({
      admin: true,
    });
  } else {
    await user.permissions.push({
      admin: false,
    });
  }

  await user.save();

  res.json(user);
};

exports.contractorHourLogs = async (req, res) => {
  const userId = req.params.id;
  const contractorHourLog = await ContractorHourLog.find({ user: userId })
    .populate('user', 'name hourlyRate')
    .populate('timeEntries', 'status hours');
  if (!contractorHourLog[0]) return res.json('empty');
  res.json(contractorHourLog);
};
