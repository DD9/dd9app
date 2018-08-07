const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const HourLog = mongoose.model('HourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.new = async (req, res) => {
  const companies = await Company.find({ status: "active" }).select('name').sort('name');
  const timeEntries = await TimeEntry.find({ status: "created", user: req.user._id }).populate('company', 'name');

  let totalCreatedTimeEntryHours = 0;
  for (let i = 0; i < timeEntries.length; i++) {
    let timeEntry = timeEntries[i];
    totalCreatedTimeEntryHours += timeEntry.hours;
  }

  res.render('timeEntry/timeEntryNew', { title: "Time Entry", companies, timeEntries, totalCreatedTimeEntryHours })
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

  const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntry._id }).populate('user company');

  res.json({ timeEntry: populatedTimeEntry, admin: req.user.permissions[0].admin });
};

exports.createAndSubmit = async (req, res) => {
  const timeEntry = await new TimeEntry({
    user: req.user._id,
    company: req.body.company,
    hourLog: req.body.hourLog,
    date: req.body.date,
    hours: req.body.hours,
    description: req.body.description,
    publicUser: req.user._id,
    publicCompany: req.body.company,
    publicDate: req.body.date,
    publicHours: req.body.hours,
    publicDescription: req.body.description,
    status: "submitted"
  }).save();

  await HourLog.findOne({ _id: req.body.hourLog },
    { $addToSet: { timeEntries: timeEntry._id } },
    { $inc: { totalSubmittedHours: timeEntry.publicHours } }
  );

  res.redirect("/hourLog/5b5a56ac443bd381c0790a6a");
};

/*
 * Handle time entry actions and updates for new creates, adjudications, admins, and staff
 */

exports.edit = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.status ==="created" && +timeEntry.user === +req.user._id) {
    timeEntry.date = req.body.date;
    timeEntry.company = req.body.company;
    timeEntry.hours = req.body.hours;
    timeEntry.description = req.body.description;
    timeEntry.publicDate = req.body.date;
    timeEntry.publicCompany = req.body.company;
    timeEntry.publicHours = req.body.hours;
    timeEntry.publicDescription = req.body.description;
  } else if (timeEntry.status !== "created" && req.user.permissions[0].admin === true) {
    timeEntry.publicDate = req.body.date;
    timeEntry.publicUser = req.body.user;
    timeEntry.publicCompany = req.body.company;
    timeEntry.publicHours = req.body.hours;
    timeEntry.publicDescription = req.body.description;
  } else {
    res.json({error: 'unauthorized'});
    return console.log(`unauthorized request: ${req.url} \n from user: ${req.user} \n with post body: ${JSON.stringify(req.body)}`);
  }

  await timeEntry.save();
  const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

  res.json({ timeEntry: populatedTimeEntry, admin: req.user.permissions[0].admin })
};

exports.approve = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.hourLog) {
    const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog });

    hourLog.totalPublicHours += timeEntry.publicHours;
    console.log(timeEntry.status);
    if (timeEntry.status === "hidden") {
      hourLog.totalHiddenHours -= timeEntry.publicHours;
    } else if (timeEntry.status === "submitted") {
      hourLog.totalSubmittedHours -= timeEntry.publicHours;
    }

    await timeEntry.update({ $set: { status: "approved" }}, { new: true });
    await hourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json({ timeEntry: populatedTimeEntry, admin: req.user.permissions[0].admin });
  } else if (!timeEntry.hourLog) {
    let hourLog = await HourLog.findOne({ title: "Current", company: timeEntry.company });

    if (!hourLog) {
      hourLog = await (new HourLog({
        company: timeEntry.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
        totalPublicHours: timeEntry.hours
      }));
      timeEntry.hourLog = hourLog._id;
    } else if (hourLog) {
      await hourLog.update({ $addToSet: { timeEntries: timeEntry._id }}, { new: true });
      hourLog.totalPublicHours += timeEntry.hours;
      timeEntry.hourLog = hourLog._id;
    }
    await timeEntry.update({ $set: { status: "approved" }}, { new: true });
    await hourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json({ timeEntry: populatedTimeEntry });
  }
};

exports.hide = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.hourLog) {
    const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog });

    hourLog.totalHiddenHours += timeEntry.publicHours;
    if (timeEntry.status === "approved") {
      hourLog.totalPublicHours -= timeEntry.publicHours;
    } else if (timeEntry.status === "submitted") {
      hourLog.totalSubmittedHours -= timeEntry.publicHours;
    }

    await timeEntry.update({ $set: { status: "hidden" }}, { new: true });
    await hourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json({ timeEntry: populatedTimeEntry, admin: req.user.permissions[0].admin });
  } else if (!timeEntry.hourLog) {
    let hourLog = await HourLog.findOne({ title: "Current", company: timeEntry.company });

    if (!hourLog) {
      hourLog = await (new HourLog({
        company: timeEntry.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
        totalHiddenHours: timeEntry.hours
      }));
      timeEntry.hourLog = hourLog._id;
    } else if (hourLog) {
      await hourLog.update({ $addToSet: { timeEntries: timeEntry._id }}, { new: true });
      hourLog.totalHiddenHours += timeEntry.hours;
      timeEntry.hourLog = hourLog._id;
    }
    await timeEntry.update({ $set: { status: "hidden" }}, { new: true });
    await hourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json({ timeEntry: populatedTimeEntry });
  }
};

exports.reject = async (req, res) => {

  console.log('rejecting');

  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });
  const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog });

  if (timeEntry.status === "approved") {
    hourLog.totalPublicHours -= timeEntry.publicHours;
  } else if (timeEntry.status === "hidden") {
    hourLog.totalHiddenHours -= timeEntry.publicHours;
  } else if (timeEntry.status === "submitted") {
    hourLog.totalSubmittedHours -= timeEntry.publicHours;
  }

  timeEntry.status = "created";
  timeEntry.publicDate = timeEntry.date;
  timeEntry.publicUser = timeEntry.user;
  timeEntry.publicCompany = timeEntry.company;
  timeEntry.publicHours = timeEntry.hours;
  timeEntry.publicDescription = timeEntry.description;

  await hourLog.save();
  await timeEntry.save();

  res.json(timeEntry);
};

exports.submit = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.hourLog) {
    const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog });

    hourLog.totalSubmittedHours += timeEntry.publicHours;
    if (timeEntry.status === "approved") {
      hourLog.totalPublicHours -= timeEntry.publicHours;
    } else if (timeEntry.status === "hidden") {
      hourLog.totalHiddenHours -= timeEntry.publicHours;
    }

    await timeEntry.update({ $set: { status: "submitted" }}, { new: true });
    await hourLog.save();
    await timeEntry.save();

    res.json(timeEntry);
  } else if (!timeEntry.hourLog) {
    let hourLog = await HourLog.findOne({ title: "Current", company: timeEntry.company });

    if (!hourLog) {
      hourLog = await (new HourLog({
        company: timeEntry.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
        totalSubmittedHours: timeEntry.hours
      }));
      timeEntry.hourLog = hourLog._id;
    } else if (hourLog) {
      await hourLog.update({ $addToSet: { timeEntries: timeEntry._id }}, { new: true });
      hourLog.totalSubmittedHours += timeEntry.hours;
      timeEntry.hourLog = hourLog._id;
    }
    await timeEntry.update({ $set: { status: "submitted" }}, { new: true });
    await hourLog.save();
    await timeEntry.save();

    res.json(timeEntry);
  }
};

exports.delete = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOneAndDelete({ _id: timeEntryId });
  res.json(timeEntry);
};