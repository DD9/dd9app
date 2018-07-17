const mongoose = require('mongoose');
const TimeEntry = mongoose.model('TimeEntry');

exports.new = async (req, res) => {
  const timeEntries = true;
  res.render("timeEntries/new", { title: "New", timeEntries: timeEntries });
};