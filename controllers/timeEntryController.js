const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const HourLog = mongoose.model('HourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.new = async (req, res) => {
  const companies = await Company.find().select('name');
  const timeEntries = await TimeEntry.find({ status: 'created', user: req.user._id });

  let totalCreatedHours = 0;
  for (let i = 0; i < timeEntries.length; i++) {
    let timeEntry = timeEntries[i];
    totalCreatedHours += timeEntry.hours;
  }

  res.render('timeEntry/new', { title: "Time Entry", companies, timeEntries, totalCreatedHours })
};

exports.create = async (req, res) => {
  const timeEntry = await new TimeEntry({
    user: req.user._id,
    company: req.body.companyId,
    hourLog: req.body.hourLogId,
    date: req.body.date,
    hours: req.body.hours,
    description: req.body.description,
    publicUser: req.user._id,
    publicCompany: req.body.companyId,
    publicDate: req.body.date,
    publicHours: req.body.hours,
    publicDescription: req.body.description
  }).save();

  await HourLog.findOneAndUpdate({ _id: req.body.hourLogId },
    { $push: { timeEntries: timeEntry._id } },
    { $inc: { totalSubmittedHours: timeEntry.publicHours } }
  );

  console.log(timeEntry);
  res.redirect(`/hourLog/5b5a56ac443bd381c0790a6a`)
  // res.render("timeEntry/new", { title: "New", timeEntries: timeEntries });
};