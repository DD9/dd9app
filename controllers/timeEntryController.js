const mongoose = require('mongoose');
const HourLog = mongoose.model('HourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.new = async (req, res) => {
  const timeEntry = await new TimeEntry({
    user: req.user._id,
    company: req.body.hourLogCompanyId,
    hourLog: req.body.hourLogId,
    date: req.body.date,
    hours: req.body.hours,
    description: req.body.description,
    publicUser: req.body.user,
    publicCompany: req.body.company,
    publicDate: req.body.date,
    publicHours: req.body.hours,
    publicDescription: req.body.description
  }).save();

  await HourLog.findOneAndUpdate({ _id: req.body.hourLogId },
    { $push: { timeEntries: timeEntry._id } },
    { $set: { hasSubmittedEntries: true } },
    { $inc: { totalSubmittedHours: timeEntry.publicHours } }
  );

  console.log(timeEntry);
  res.redirect(`/hourLog/5b57dea4739c032f9610f9de`)
  // res.render("timeEntry/new", { title: "New", timeEntries: timeEntries });
};