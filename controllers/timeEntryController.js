const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const HourLog = mongoose.model('HourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.new = async (req, res) => {
  const companies = await Company.find({ status: "active" }).select('name').sort('name');
  const timeEntries = await TimeEntry.find({ status: 'created', user: req.user._id }).populate('company', 'name');

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
    company: req.body.company,
    date: req.body.date,
    hours: req.body.hours,
    description: req.body.description,
    publicUser: req.user._id,
    publicCompany: req.body.company,
    publicDate: req.body.date,
    publicHours: req.body.hours,
    publicDescription: req.body.description,
    status: "created"
  }).save();

  res.json({ timeEntry, admin: req.user.permissions[0].admin });
};

exports.createAndSubmit = async (req, res) => {
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
    publicDescription: req.body.description,
    status: "submitted"
  }).save();

  await HourLog.findOne({ _id: req.body.hourLogId },
    { $push: { timeEntries: timeEntry._id } },
    { $inc: { totalSubmittedHours: timeEntry.publicHours } }
  );

  res.redirect("/hourLog/5b5a56ac443bd381c0790a6a");
};

exports.approve = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOneAndUpdate({ _id: timeEntryId }, { $set: { status: "approved" } }, { new: true });
  let hourLog = await HourLog.findOne({ title: "Current", company: timeEntry.company });

  if (!hourLog) {
    hourLog = await (new HourLog({ company: timeEntry.company, timeEntries: timeEntry._id, dateClosed: new Date(0), totalPublicHours: timeEntry.hours }));
    timeEntry.hourLog = hourLog._id;
  } else {
    await hourLog.update({ $push: { timeEntries: timeEntry._id }});
    hourLog.totalPublicHours += timeEntry.hours;
    timeEntry.hourLog = hourLog._id;
  }
  await hourLog.save();
  await timeEntry.save();

  res.json(timeEntry);
};

exports.hide = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOneAndUpdate({ _id: timeEntryId }, { $set: { status: "hidden" } }, { new: true });
  let hourLog = await HourLog.findOne({ title: "Current", company: timeEntry.company });

  if (!hourLog) {
    hourLog = await (new HourLog({ company: timeEntry.company, timeEntries: timeEntry._id, dateClosed: new Date(0), totalHiddenHours: timeEntry.hours }));
    timeEntry.hourLog = hourLog._id;
  } else {
    await hourLog.update({ $push: { timeEntries: timeEntry._id }});
    hourLog.totalHiddenHours += timeEntry.hours;
    timeEntry.hourLog = hourLog._id;
  }
  await hourLog.save();
  await timeEntry.save();

  res.json(timeEntry);
};

exports.submit = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOneAndUpdate({ _id: timeEntryId }, { $set: { status: "submitted" } }, { new: true });
  let hourLog = await HourLog.findOne({ title: "Current", company: timeEntry.company });

  if (!hourLog) {
    hourLog = await (new HourLog({ company: timeEntry.company, timeEntries: timeEntry._id, dateClosed: new Date(0), totalSubmittedHours: timeEntry.hours }));
    timeEntry.hourLog = hourLog._id;
  } else {
    await hourLog.update({ $push: { timeEntries: timeEntry._id }});
    hourLog.totalSubmittedHours += timeEntry.hours;
    timeEntry.hourLog = hourLog._id;
  }
  await hourLog.save();
  await timeEntry.save();

  res.json(timeEntry);
};

exports.delete = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOneAndDelete({ _id: timeEntryId });
  res.json(timeEntry);
};