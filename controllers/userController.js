const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.all = async (req, res) => {
  const users = await User.find().populate("company");
  res.render("user/all", { title: "Users", users: users });
};