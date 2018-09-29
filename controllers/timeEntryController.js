const mongoose = require('mongoose');

const HourLog = mongoose.model('HourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.created = async (req, res) => {
  const createdTimeEntries = await TimeEntry.find({ status: 'created', user: req.user._id })
    .populate('publicCompany', 'name')
    .populate('publicUser', 'firstName lastName');

  res.json(createdTimeEntries);
};

exports.create = async (req, res) => {
  const newTimeEntry = await new TimeEntry({
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
    status: 'created',
  }).save();

  const populatedTimeEntry = await TimeEntry.findOne({ _id: newTimeEntry._id })
    .populate('publicCompany', 'name')
    .populate('publicUser', 'firstName lastName');

  res.json(populatedTimeEntry);
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
    status: 'submitted',
  }).save();

  await HourLog.findOneAndUpdate(
    { _id: req.body.hourLog },
    {
      $addToSet: { timeEntries: timeEntry._id },
      $inc: { totalSubmittedHours: timeEntry.hours },
    },
  );

  const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntry._id }).populate('user publicUser company publicCompany');

  res.json(populatedTimeEntry);
};

exports.edit = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  // The timeEntry must be 'new' and a user must own the timeEntry to edit it
  if (!timeEntry.hourLog && timeEntry.user.toString() === req.user._id.toString()) {
    timeEntry.date = req.body.date;
    timeEntry.company = req.body.company;
    timeEntry.hours = req.body.hours;
    timeEntry.description = req.body.description;
    timeEntry.publicDate = req.body.date;
    timeEntry.publicCompany = req.body.company;
    timeEntry.publicHours = req.body.hours;
    timeEntry.publicDescription = req.body.description;
    await timeEntry.save();
    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');
    res.json(populatedTimeEntry);
  // Else throw an error
  } else {
    res.json({ error: 'unauthorized' });
    return console.log(`unauthorized request: ${req.url} \n from user: ${req.user} \n with post body: ${JSON.stringify(req.body)}`);
  }
};

exports.adjudicate = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });
  const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog }).populate('timeEntries');

  // If transferring the time entry to another companies hour log
  if (timeEntry.publicCompany.toString() !== req.body.company.toString()) {
    await hourLog.update({ $pull: { timeEntries: timeEntry._id } });

    let receivingHourLog = await HourLog.findOne({ title: 'Current', company: req.body.company });
    // If there's no current hour log for the company that a time entry is being transferred to, create one
    if (!receivingHourLog) {
      receivingHourLog = await (new HourLog({
        company: req.body.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
      })).save();
    } else if (receivingHourLog) {
      await receivingHourLog.update({ $addToSet: { timeEntries: timeEntry._id } });
    }
    timeEntry.hourLog = receivingHourLog._id;

    // Subtract current hours on sending hour log, add new hours to receiving hour log
    if (timeEntry.status === 'approved') {
      hourLog.totalPublicHours -= timeEntry.publicHours;
      receivingHourLog.totalPublicHours += +req.body.hours;
    } else if (timeEntry.status === 'hidden') {
      hourLog.totalHiddenHours -= timeEntry.publicHours;
      receivingHourLog.totalHiddenHours += +req.body.hours;
    } else if (timeEntry.status === 'submitted') {
      hourLog.totalSubmittedHours -= timeEntry.publicHours;
      receivingHourLog.totalSubmittedHours += +req.body.hours;
    }

    await receivingHourLog.save();

    // Else if not transferring but still adjudicating the timeEntry
  } else if (timeEntry.status === 'approved') {
    hourLog.totalPublicHours -= (timeEntry.publicHours - req.body.hours);
  } else if (timeEntry.status === 'hidden') {
    hourLog.totalHiddenHours -= (timeEntry.publicHours - req.body.hours);
  } else if (timeEntry.status === 'submitted') {
    hourLog.totalSubmittedHours -= (timeEntry.publicHours - req.body.hours);
  }

  timeEntry.publicDate = req.body.date;
  timeEntry.publicUser = req.body.user;
  timeEntry.publicCompany = req.body.company;
  timeEntry.publicHours = req.body.hours;
  timeEntry.publicDescription = req.body.description;

  await hourLog.save();
  await timeEntry.save();

  const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

  res.json(populatedTimeEntry);
};

exports.approve = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.hourLog) {
    const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog }).populate('timeEntries');

    hourLog.totalPublicHours += timeEntry.publicHours;
    if (timeEntry.status === 'hidden') {
      hourLog.totalHiddenHours -= timeEntry.publicHours;
    } else if (timeEntry.status === 'submitted') {
      hourLog.totalSubmittedHours -= timeEntry.publicHours;
    }

    await timeEntry.update({ $set: { status: 'approved' } }, { new: true });
    await hourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json(populatedTimeEntry);
  } else if (!timeEntry.hourLog) {
    let hourLog = await HourLog.findOne({ title: 'Current', company: timeEntry.company });

    if (!hourLog) {
      hourLog = await (new HourLog({
        company: timeEntry.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
        totalPublicHours: timeEntry.hours,
      }));
      timeEntry.hourLog = hourLog._id;
    } else if (hourLog) {
      await hourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
      hourLog.totalPublicHours += timeEntry.hours;
      timeEntry.hourLog = hourLog._id;
    }
    await timeEntry.update({ $set: { status: 'approved' } }, { new: true });
    await hourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json(populatedTimeEntry);
  }
};

exports.hide = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.hourLog) {
    const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog }).populate('timeEntries');

    hourLog.totalHiddenHours += timeEntry.publicHours;
    if (timeEntry.status === 'approved') {
      hourLog.totalPublicHours -= timeEntry.publicHours;
    } else if (timeEntry.status === 'submitted') {
      hourLog.totalSubmittedHours -= timeEntry.publicHours;
    }

    await timeEntry.update({ $set: { status: 'hidden' } }, { new: true });
    await hourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json(populatedTimeEntry);
  } else if (!timeEntry.hourLog) {
    let hourLog = await HourLog.findOne({ title: 'Current', company: timeEntry.company });

    if (!hourLog) {
      hourLog = await (new HourLog({
        company: timeEntry.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
        totalHiddenHours: timeEntry.hours,
      }));
      timeEntry.hourLog = hourLog._id;
    } else if (hourLog) {
      await hourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
      hourLog.totalHiddenHours += timeEntry.hours;
      timeEntry.hourLog = hourLog._id;
    }
    await timeEntry.update({ $set: { status: 'hidden' } }, { new: true });
    await hourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json(populatedTimeEntry);
  }
};

exports.reject = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });
  const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog }).populate('timeEntries');

  if (timeEntry.status === 'approved') hourLog.totalPublicHours -= timeEntry.publicHours;
  else if (timeEntry.status === 'hidden') hourLog.totalHiddenHours -= timeEntry.publicHours;
  else if (timeEntry.status === 'submitted') hourLog.totalSubmittedHours -= timeEntry.publicHours;

  await timeEntry.update({ $set: { status: 'rejected' } });

  await new TimeEntry({
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
    status: 'created',
  }).save();

  await hourLog.save();

  res.json(timeEntry);
};

exports.submit = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  // The user must own the timeEntry or be an admin to submit it
  if (req.user.permissions[0].admin || timeEntry.user.toString() === req.user._id.toString()) {
    if (timeEntry.hourLog) {
      const hourLog = await HourLog.findOne({ _id: timeEntry.hourLog });

      hourLog.totalSubmittedHours += timeEntry.publicHours;
      if (timeEntry.status === 'approved') {
        hourLog.totalPublicHours -= timeEntry.publicHours;
      } else if (timeEntry.status === 'hidden') {
        hourLog.totalHiddenHours -= timeEntry.publicHours;
      }

      await timeEntry.update({ $set: { status: 'submitted' } }, { new: true });
      await hourLog.save();
      await timeEntry.save();

      res.json(timeEntry);
    } else if (!timeEntry.hourLog) {
      let hourLog = await HourLog.findOne({ title: 'Current', company: timeEntry.company });

      if (!hourLog) {
        hourLog = await (new HourLog({
          company: timeEntry.company,
          timeEntries: timeEntry._id,
          dateClosed: new Date(0),
          totalSubmittedHours: timeEntry.hours,
        }));
        timeEntry.hourLog = hourLog._id;
      } else if (hourLog) {
        await hourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
        hourLog.totalSubmittedHours += timeEntry.hours;
        timeEntry.hourLog = hourLog._id;
      }
      await timeEntry.update({ $set: { status: 'submitted' } }, { new: true });
      await hourLog.save();
      await timeEntry.save();

      res.json(timeEntry);
    }
    // Else throw an error
  } else {
    res.json({ error: 'unauthorized' });
    return console.log(`unauthorized request: ${req.url} \n from user: ${req.user} \n with post body: ${JSON.stringify(req.body)}`);
  }
};

exports.delete = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOneAndDelete({ _id: timeEntryId });
  res.json(timeEntry);
};

/**
 * timeEntry/new 'all' actions endpoint
 */

exports.allActionsFromNewTimeEntries = async (req, res) => {
  const status = req.params.action;

  if (status === 'deleted') {
    await TimeEntry.remove({ user: req.user._id, status: 'created' });
    return res.json('');
  }

  const timeEntries = await TimeEntry.find({ user: req.user._id, status: 'created' });

  for (let i = 0; i < timeEntries.length; i++) {
    timeEntry = timeEntries[i];
    await findOrCreateCurrentHourLog(status, timeEntry);
    timeEntry.status = status;
    await timeEntry.save();
  }

  res.json('');
};

/**
 * hourLog/one 'all' actions endpoint for submitted timeEntries
 */

exports.submittedAllActionsFromHourLog = async (req, res) => {
  const hourLogId = req.params.id;
  const status = req.params.status;
  let hours = 0;

  const timeEntries = await TimeEntry.find({ hourLog: hourLogId, status: 'submitted' });
  const hourLog = await HourLog.findOne({ _id: hourLogId });

  if (status === 'rejected') {
    for (let i = 0; i < timeEntries.length; i++) {
      timeEntry = timeEntries[i];
      timeEntry.status = status;
      await timeEntry.save();

      await new TimeEntry({
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
        status: 'created',
      }).save();
    }

    hourLog.totalSubmittedHours = 0;
    hourLog.save();
    req.flash('success', `Successfully ${status} all time entries`);
    res.redirect(req.get('referer'));
  }

  for (let i = 0; i < timeEntries.length; i++) {
    timeEntry = timeEntries[i];
    timeEntry.status = status;
    hours += timeEntry.publicHours;
    await timeEntry.save();
  }

  if (status === 'approved') hourLog.totalPublicHours += hours;
  else if (status === 'hidden') hourLog.totalHiddenHours += hours;

  hourLog.totalSubmittedHours = 0;
  await hourLog.save();

  req.flash('success', `Successfully ${status} all time entries`);
  res.redirect(req.get('referer'));
};

/**
 * Helper functions
 */

async function findOrCreateCurrentHourLog(status, timeEntry) {
  let hourLogHoursUpdateParameter;
  if (status === 'approved') hourLogHoursUpdateParameter = 'totalPublicHours';
  else if (status === 'hidden') hourLogHoursUpdateParameter = 'totalHiddenHours';
  else if (status === 'submitted') hourLogHoursUpdateParameter = 'totalSubmittedHours';

  let hourLog = await HourLog.findOne({ title: 'Current', company: timeEntry.company });

  // If there's no current hourLog create one
  if (!hourLog) {
    hourLog = await (new HourLog({
      company: timeEntry.company,
      timeEntries: timeEntry._id,
      dateClosed: new Date(0),
    }));
    // Total approved, hidden, or submitted hours
    hourLog[`${hourLogHoursUpdateParameter}`] = timeEntry.hours;
    timeEntry.hourLog = hourLog._id;
  }

  // If there is a current hourLog append to it
  else if (hourLog) {
    console.log(hourLog);
    await hourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });

    if (status === 'approved') hourLog.totalPublicHours += timeEntry.hours;
    else if (status === 'hidden') hourLog.totalHiddenHours += timeEntry.hours;
    else if (status === 'submitted') hourLog.totalSubmittedHours += timeEntry.hours;

    timeEntry.hourLog = hourLog._id;
    console.log(hourLog);
  }
  await hourLog.save();
}
