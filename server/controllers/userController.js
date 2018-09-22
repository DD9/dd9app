const mongoose = require('mongoose');

const User = mongoose.model('User');
const Company = mongoose.model('Company');

exports.all = async (req, res) => {
  const users = await User.find().populate('company', 'name');
  res.json(users);
};

exports.one = async (req, res) => {
  const companies = await Company.find({ status: 'active' }).select('name').sort('name');
  res.render('user/userOne', { title: 'My Account', companies });
};

exports.edit = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { firstName: req.body.firstName, lastName: req.body.lastName },
    { new: true },
  ).populate('company', 'name');
  await user.save();
  res.json(user);
};

exports.adminEdit = async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  const user = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true }).populate('company', 'name');

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
