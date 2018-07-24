const mongoose = require('mongoose');
const HourLog = mongoose.model('HourLog');

exports.all = async (req, res) => {
  const hourLogs = await HourLog.find().populate("company");
  res.render("hourLog/all", { title: "Hour Logs", hourLogs: hourLogs });
};

exports.one = async (req, res) => {
  const hourLogId = req.params.id;

  const hourLog = await HourLog.findOne({ _id: hourLogId })
    .populate("company timeEntries")
    .populate({
      path: 'timeEntries',
      populate: [{
        path: 'publicCompany',
        model: 'Company',
        select: 'name'
      },{
        path: 'publicUser',
        model: 'User',
        select: 'firstName lastName'
      }]
    });

  res.render("hourLog/one", { title: hourLog.company.name, hourLog: hourLog, timeEntries: hourLog.timeEntries });
};