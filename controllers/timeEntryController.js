const mongoose = require('mongoose');

const CompanyHourLog = mongoose.model('CompanyHourLog');
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
    companyHourLog: req.body.companyHourLog,
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

  await CompanyHourLog.findOneAndUpdate(
    { _id: req.body.companyHourLog },
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
  if (!timeEntry.companyHourLog && timeEntry.user.toString() === req.user._id.toString()) {
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
  const companyHourLog = await CompanyHourLog.findOne({ _id: timeEntry.companyHourLog }).populate('timeEntries');

  // If transferring the time entry to another companies hour log
  if (timeEntry.publicCompany.toString() !== req.body.company.toString()) {
    await companyHourLog.update({ $pull: { timeEntries: timeEntry._id } });

    let receivingCompanyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: req.body.company });
    // If there's no current hour log for the company that a time entry is being transferred to, create one
    if (!receivingCompanyHourLog) {
      receivingCompanyHourLog = await (new CompanyHourLog({
        company: req.body.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
      })).save();
    } else if (receivingCompanyHourLog) {
      await receivingCompanyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } });
    }
    timeEntry.companyHourLog = receivingCompanyHourLog._id;

    // Subtract current hours on sending hour log, add new hours to receiving hour log
    if (timeEntry.status === 'approved') {
      companyHourLog.totalPublicHours -= timeEntry.publicHours;
      receivingCompanyHourLog.totalPublicHours += +req.body.hours;
    } else if (timeEntry.status === 'hidden') {
      companyHourLog.totalHiddenHours -= timeEntry.publicHours;
      receivingCompanyHourLog.totalHiddenHours += +req.body.hours;
    } else if (timeEntry.status === 'submitted') {
      companyHourLog.totalSubmittedHours -= timeEntry.publicHours;
      receivingCompanyHourLog.totalSubmittedHours += +req.body.hours;
    }

    await receivingCompanyHourLog.save();

    // Else if not transferring but still adjudicating the timeEntry
  } else if (timeEntry.status === 'approved') {
    companyHourLog.totalPublicHours -= (timeEntry.publicHours - req.body.hours);
  } else if (timeEntry.status === 'hidden') {
    companyHourLog.totalHiddenHours -= (timeEntry.publicHours - req.body.hours);
  } else if (timeEntry.status === 'submitted') {
    companyHourLog.totalSubmittedHours -= (timeEntry.publicHours - req.body.hours);
  }

  timeEntry.publicDate = req.body.date;
  timeEntry.publicUser = req.body.user;
  timeEntry.publicCompany = req.body.company;
  timeEntry.publicHours = req.body.hours;
  timeEntry.publicDescription = req.body.description;

  await companyHourLog.save();
  await timeEntry.save();

  const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

  res.json(populatedTimeEntry);
};

exports.approve = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.companyHourLog) {
    const companyHourLog = await CompanyHourLog.findOne({ _id: timeEntry.companyHourLog }).populate('timeEntries');
    console.log(timeEntry.companyHourLog);

    companyHourLog.totalPublicHours += timeEntry.publicHours;
    if (timeEntry.status === 'hidden') {
      companyHourLog.totalHiddenHours -= timeEntry.publicHours;
    } else if (timeEntry.status === 'submitted') {
      companyHourLog.totalSubmittedHours -= timeEntry.publicHours;
    }

    await timeEntry.update({ $set: { status: 'approved' } }, { new: true });
    await companyHourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json(populatedTimeEntry);
  } else if (!timeEntry.companyHourLog) {
    let companyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: timeEntry.company });

    if (!companyHourLog) {
      companyHourLog = await (new CompanyHourLog({
        company: timeEntry.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
        totalPublicHours: timeEntry.hours,
      }));
      timeEntry.companyHourLog = companyHourLog._id;
    } else if (companyHourLog) {
      await companyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
      companyHourLog.totalPublicHours += timeEntry.hours;
      timeEntry.companyHourLog = companyHourLog._id;
    }
    await timeEntry.update({ $set: { status: 'approved' } }, { new: true });
    await companyHourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json(populatedTimeEntry);
  }
};

exports.hide = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.companyHourLog) {
    const companyHourLog = await CompanyHourLog.findOne({ _id: timeEntry.companyHourLog }).populate('timeEntries');

    companyHourLog.totalHiddenHours += timeEntry.publicHours;
    if (timeEntry.status === 'approved') {
      companyHourLog.totalPublicHours -= timeEntry.publicHours;
    } else if (timeEntry.status === 'submitted') {
      companyHourLog.totalSubmittedHours -= timeEntry.publicHours;
    }

    await timeEntry.update({ $set: { status: 'hidden' } }, { new: true });
    await companyHourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json(populatedTimeEntry);
  } else if (!timeEntry.companyHourLog) {
    let companyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: timeEntry.company });

    if (!companyHourLog) {
      companyHourLog = await (new CompanyHourLog({
        company: timeEntry.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
        totalHiddenHours: timeEntry.hours,
      }));
      timeEntry.companyHourLog = companyHourLog._id;
    } else if (companyHourLog) {
      await companyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
      companyHourLog.totalHiddenHours += timeEntry.hours;
      timeEntry.companyHourLog = companyHourLog._id;
    }
    await timeEntry.update({ $set: { status: 'hidden' } }, { new: true });
    await companyHourLog.save();
    await timeEntry.save();

    const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

    res.json(populatedTimeEntry);
  }
};

exports.reject = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });
  const companyHourLog = await CompanyHourLog.findOne({ _id: timeEntry.companyHourLog }).populate('timeEntries');

  if (timeEntry.status === 'approved') companyHourLog.totalPublicHours -= timeEntry.publicHours;
  else if (timeEntry.status === 'hidden') companyHourLog.totalHiddenHours -= timeEntry.publicHours;
  else if (timeEntry.status === 'submitted') companyHourLog.totalSubmittedHours -= timeEntry.publicHours;

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

  await companyHourLog.save();

  res.json(timeEntry);
};

exports.submit = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  // The user must own the timeEntry or be an admin to submit it
  if (req.user.permissions[0].admin || timeEntry.user.toString() === req.user._id.toString()) {
    if (timeEntry.companyHourLog) {
      const companyHourLog = await CompanyHourLog.findOne({ _id: timeEntry.companyHourLog });

      companyHourLog.totalSubmittedHours += timeEntry.publicHours;
      if (timeEntry.status === 'approved') {
        companyHourLog.totalPublicHours -= timeEntry.publicHours;
      } else if (timeEntry.status === 'hidden') {
        companyHourLog.totalHiddenHours -= timeEntry.publicHours;
      }

      await timeEntry.update({ $set: { status: 'submitted' } }, { new: true });
      await companyHourLog.save();
      await timeEntry.save();

      res.json(timeEntry);
    } else if (!timeEntry.companyHourLog) {
      let companyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: timeEntry.company });

      if (!companyHourLog) {
        companyHourLog = await (new CompanyHourLog({
          company: timeEntry.company,
          timeEntries: timeEntry._id,
          dateClosed: new Date(0),
          totalSubmittedHours: timeEntry.hours,
        }));
        timeEntry.companyHourLog = companyHourLog._id;
      } else if (companyHourLog) {
        await companyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
        companyHourLog.totalSubmittedHours += timeEntry.hours;
        timeEntry.companyHourLog = companyHourLog._id;
      }
      await timeEntry.update({ $set: { status: 'submitted' } }, { new: true });
      await companyHourLog.save();
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

exports.newTimeEntryBulkAction = async (req, res) => {
  const { status } = req.params;

  if (status === 'deleted') {
    await TimeEntry.remove({ user: req.user._id, status: 'created' });
    return res.json('');
  }

  const timeEntries = await TimeEntry.find({ user: req.user._id, status: 'created' });

  for (let i = 0; i < timeEntries.length; i++) {
    const timeEntry = timeEntries[i];
    await createOrFindAndUpdateCurrentHourLog(status, timeEntry);
    timeEntry.status = status;
    await timeEntry.save();
  }

  res.json('');
};

exports.timeEntryInHourLogBulkAction = async (req, res) => {
  const { companyHourLogId, currentStatus, receivingStatus } = req.params;

  let currentCompanyHourLogHoursUpdateParameter;
  if (currentStatus === 'approved') currentCompanyHourLogHoursUpdateParameter = 'totalPublicHours';
  else if (currentStatus === 'hidden') currentCompanyHourLogHoursUpdateParameter = 'totalHiddenHours';
  else if (currentStatus === 'submitted') currentCompanyHourLogHoursUpdateParameter = 'totalSubmittedHours';

  let receivingCompanyHourLogHoursUpdateParameter;
  if (receivingStatus === 'approved') receivingCompanyHourLogHoursUpdateParameter = 'totalPublicHours';
  else if (receivingStatus === 'hidden') receivingCompanyHourLogHoursUpdateParameter = 'totalHiddenHours';
  else if (receivingStatus === 'submitted') receivingCompanyHourLogHoursUpdateParameter = 'totalSubmittedHours';

  let hours = 0;

  const timeEntries = await TimeEntry.find({ companyHourLog: companyHourLogId, status: currentStatus });
  const companyHourLog = await CompanyHourLog.findOne({ _id: companyHourLogId }).populate('timeEntries');

  if (receivingStatus === 'rejected') {
    for (let i = 0; i < timeEntries.length; i++) {
      const timeEntry = timeEntries[i];
      timeEntry.status = receivingStatus;
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

    companyHourLog[`${currentCompanyHourLogHoursUpdateParameter}`] = 0;
    companyHourLog.save();
    res.json('');
  }

  for (let i = 0; i < timeEntries.length; i++) {
    const timeEntry = timeEntries[i];
    timeEntry.status = receivingStatus;
    hours += timeEntry.publicHours;
    await timeEntry.save();
  }

  companyHourLog[`${currentCompanyHourLogHoursUpdateParameter}`] = 0;
  companyHourLog[`${receivingCompanyHourLogHoursUpdateParameter}`] += hours;
  await companyHourLog.save();

  res.json('');
};

/**
 * Helper functions
 */

async function createOrFindAndUpdateCurrentHourLog(status, timeEntry) {
  let companyHourLogHoursUpdateParameter;
  if (status === 'approved') companyHourLogHoursUpdateParameter = 'totalPublicHours';
  else if (status === 'hidden') companyHourLogHoursUpdateParameter = 'totalHiddenHours';
  else if (status === 'submitted') companyHourLogHoursUpdateParameter = 'totalSubmittedHours';

  let companyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: timeEntry.company });

  // If there's no current companyHourLog create one
  if (!companyHourLog) {
    companyHourLog = await (new CompanyHourLog({
      company: timeEntry.company,
      timeEntries: timeEntry._id,
      dateClosed: new Date(0),
    }));
    // Total approved, hidden, or submitted hours
    companyHourLog[`${companyHourLogHoursUpdateParameter}`] = timeEntry.hours;
    timeEntry.companyHourLog = companyHourLog._id;
  }

  // If there is a current companyHourLog append to it
  else if (companyHourLog) {
    await companyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });

    if (status === 'approved') companyHourLog.totalPublicHours += timeEntry.hours;
    else if (status === 'hidden') companyHourLog.totalHiddenHours += timeEntry.hours;
    else if (status === 'submitted') companyHourLog.totalSubmittedHours += timeEntry.hours;

    timeEntry.companyHourLog = companyHourLog._id;
  }
  await companyHourLog.save();
}
