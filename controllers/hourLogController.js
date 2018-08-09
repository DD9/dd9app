const mongoose = require('mongoose');
const User = mongoose.model('User');
const Company = mongoose.model('Company');
const HourLog = mongoose.model('HourLog');

exports.all = async (req, res) => {
  const hourLogs = await HourLog.find().populate('company');
  res.render("hourLog/hourLogAll", { title: "Hour Logs", hourLogs: hourLogs });
};

exports.one = async (req, res) => {
  const hourLogId = req.params.id;
  const users = await User.find({ status: "active" }).select('firstName lastName').sort('firstName');
  const companies = await Company.find({ status: "active" }).select('name').sort('name');
  const hourLog = await HourLog.findOne({ _id: hourLogId })
    .populate('company', 'name')
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
  res.render("hourLog/hourLogOne", { title: hourLog.company.name, users, companies, hourLog });
};

exports.open = async (req, res) => {
  const hourLogId = req.params.id;

  const closingHourLog = await HourLog.findOne({ _id: hourLogId });
  const currentHourLog = await HourLog.findOne({ title: "Current", company: closingHourLog.company });

  if (!currentHourLog) {
    closingHourLog.title = "Current";
    closingHourLog.dateClosed = new Date(0);
    await closingHourLog.save();
    return res.json({ updatedClosedHourLog: true });
  } else {
    currentHourLog.totalPublicHours += closingHourLog.totalPublicHours;
    currentHourLog.totalHiddenHours += closingHourLog.totalHiddenHours;
    await currentHourLog.update({ $addToSet: { timeEntries: closingHourLog.timeEntries }});
    await closingHourLog.remove();
    await currentHourLog.save();
    return res.json(currentHourLog);
  }
};

exports.close = async (req, res) => {
  const hourLogId = req.params.id;
  const hourLog = await HourLog.findOne({ _id: hourLogId });

  if (hourLog.totalSubmittedHours > 0) {
    return res.json({ error: "Cannot close an hour log with submitted time entries."});
  } else {
    hourLog.title = req.body.title;
    hourLog.dateClosed = new Date();
    await hourLog.save();
  }

  res.json(hourLog);
};

exports.timeEntries = async (req, res) => {
  const hourLogId = req.params.id;
  const hourLog = await HourLog.findOne({ _id: hourLogId })
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

  const approvedTimeEntries = [];
  const hiddenTimeEntries = [];
  const submittedTimeEntries = [];

  for (let i = 0; i < hourLog.timeEntries.length; i++) {
    let timeEntry = hourLog.timeEntries[i];
    switch (timeEntry.status) {
      case "approved":
        approvedTimeEntries.push(timeEntry);
        break;
      case "hidden":
        hiddenTimeEntries.push(timeEntry);
        break;
      case "submitted":
        submittedTimeEntries.push(timeEntry);
      default:
        break;
    }
  }

  res.json({ approvedTimeEntries, hiddenTimeEntries, submittedTimeEntries });
};

