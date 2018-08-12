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

  await HourLog.findOneAndUpdate(
    { _id: req.body.hourLog },
    {
      $addToSet: { timeEntries: timeEntry._id },
      $inc: { totalSubmittedHours: timeEntry.hours }
    },
  );

  const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntry._id }).populate('publicCompany publicUser');

  res.json({ timeEntry: populatedTimeEntry, admin: req.user.permissions[0].admin });
};

/*
 * Handle time entry actions and updates for new creates, adjudications, admins, and staff
 */

exports.edit = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  let adjudicatedTimeEntryCompany = false;

  console.log("1");
  console.log(timeEntry);

  console.log(!timeEntry.hourLog);

  console.log(timeEntry.user.toString() === req.user._id.toString());

  // If a user is editing a newly created time entry that he owns
  if (!timeEntry.hourLog && timeEntry.user.toString() === req.user._id.toString()) {
    timeEntry.date = req.body.date;
    timeEntry.company = req.body.company;
    timeEntry.hours = req.body.hours;
    timeEntry.description = req.body.description;
    timeEntry.publicDate = req.body.date;
    timeEntry.publicCompany = req.body.company;
    timeEntry.publicHours = req.body.hours;
    timeEntry.publicDescription = req.body.description;

    console.log("2");
    console.log(timeEntry);

  // If editing an admin is editing a time entry in an hour log
  } else if (timeEntry.hourLog && req.user.permissions[0].admin === true) {

    const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog });

    // If transferring the time entry to another companies hour log
    if (timeEntry.publicCompany.toString() !== req.body.company.toString()) {
      adjudicatedTimeEntryCompany = true;
      await hourLog.update({ $pull: { timeEntries: timeEntry._id }});

      let receivingHourLog = await HourLog.findOne({ title: "Current", company: req.body.company });
      // If there's no current hour log for the company that a time entry is being transferred to
      if (!receivingHourLog) {
        receivingHourLog = await (new HourLog({
          company: req.body.company,
          timeEntries: timeEntry._id,
          dateClosed: new Date(0),
        })).save();
      } else if (receivingHourLog) {
        await receivingHourLog.update({ $addToSet: { timeEntries: timeEntry._id }});
      }
      timeEntry.hourLog = receivingHourLog._id;

      // Subtract current hours on sending hour log, add new hours to receiving hour log
      if (timeEntry.status === "approved") {
        hourLog.totalPublicHours -= timeEntry.publicHours;
        receivingHourLog.totalPublicHours += +req.body.hours;
      } else if (timeEntry.status === "hidden") {
        hourLog.totalHiddenHours -= timeEntry.publicHours;
        receivingHourLog.totalHiddenHours += +req.body.hours;
      } else if (timeEntry.status === "submitted") {
        hourLog.totalSubmittedHours -= timeEntry.publicHours;
        receivingHourLog.totalSubmittedHours += +req.body.hours;
      }

      await receivingHourLog.save();

    // Else if not transferring but editing hours or other
    } else {
      if (timeEntry.status === "approved") {
        hourLog.totalPublicHours = (hourLog.totalPublicHours - (timeEntry.publicHours - req.body.hours));
      } else if (timeEntry.status === "hidden") {
        hourLog.totalHiddenHours = (hourLog.totalHiddenHours - (timeEntry.publicHours - req.body.hours));
      } else if (timeEntry.status === "submitted") {
        hourLog.totalSubmittedHours = (hourLog.totalSubmittedHours - (timeEntry.publicHours - req.body.hours));
      }
    }

    timeEntry.publicDate = req.body.date;
    timeEntry.publicUser = req.body.user;
    timeEntry.publicCompany = req.body.company;
    timeEntry.publicHours = req.body.hours;
    timeEntry.publicDescription = req.body.description;

    await hourLog.save();

  // Catch unauthorized POST's
  } else {
    res.json({error: 'unauthorized'});
    return console.log(`unauthorized request: ${req.url} \n from user: ${req.user} \n with post body: ${JSON.stringify(req.body)}`);
  }

  await timeEntry.save();

  const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

  res.json({ timeEntry: populatedTimeEntry, admin: req.user.permissions[0].admin, adjudicatedTimeEntryCompany: adjudicatedTimeEntryCompany})
};

exports.approve = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.hourLog) {
    const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog });

    hourLog.totalPublicHours += timeEntry.publicHours;
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

  timeEntry.status = "rejected";

  const returnedTimeEntry = await new TimeEntry({
    user: timeEntry.user,
    company: timeEntry.company,
    date: timeEntry.date,
    hours: timeEntry.hours,
    description: timeEntry.description,
    publicUser: timeEntry.user,
    publicCompany: timeEntry.company,
    publicDate: timeEntry.date,
    publicHours: timeEntry.hours,
    publicDescription: timeEntry.description,
    status: "created"
  }).save();

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