const mongoose = require('mongoose');
const HourLog = mongoose.model('HourLog');

exports.all = async (req, res) => {
  const hourLogs = await HourLog.find().populate("companyId");
  console.log(hourLogs);
  res.render("hourLog/all", { title: "Hour Logs", hourLogs: hourLogs});
};