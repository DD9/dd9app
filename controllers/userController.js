const mongoose = require('mongoose');
const User = mongoose.model('User');
const Company = mongoose.model('Company');

exports.all = async (req, res) => {
  const users = await User.find().populate("company");
  const companies = await Company.find({ active: true }).sort('name').select('name');
  res.render("user/all", { title: "Users", users, companies});
};

exports.edit = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {new: true}).populate("company");

  await user.permissions.pop();
  if (req.body.role === "admin") {
    await user.permissions.push({
      'admin': true
    });
  } else {
    await user.permissions.push({
      'admin': false
    });
  }
  await user.save();

  res.json(user);
};