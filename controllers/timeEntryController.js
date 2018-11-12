const mongoose = require('mongoose');

const CompanyHourLog = mongoose.model('CompanyHourLog');
const ContractorHourLog = mongoose.model('ContractorHourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.created = async (req, res) => {
  const createdTimeEntries = await TimeEntry.find({ status: 'created', user: req.user._id }).populate('publicCompany', 'name');
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

  await createOrAppendCurrentContractorHourLog(req.user._id, req.user.hourlyRate, newTimeEntry);

  const populatedTimeEntry = await TimeEntry.findOne({ _id: newTimeEntry._id }).populate('user publicUser company publicCompany');

  res.json(populatedTimeEntry);
};

exports.createAndSubmit = async (req, res) => {
  const newTimeEntry = await new TimeEntry({
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
      $addToSet: { timeEntries: newTimeEntry._id },
    },
  );

  await createOrAppendCurrentContractorHourLog(req.user._id, req.user.hourlyRate, newTimeEntry);

  const populatedTimeEntry = await TimeEntry.findOne({ _id: newTimeEntry._id }).populate('user publicUser company publicCompany');

  res.json(populatedTimeEntry);
};

exports.edit = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  if (timeEntry.companyHourLog) {
    res.json({ error: 'unauthorized' });
    return console.log(`unauthorized request: ${req.url} \n from user: ${req.user} \n with post body: ${JSON.stringify(req.body)}`);
  }

  // The timeEntry must be 'new' and a user must own the timeEntry to edit it
  if ((timeEntry.user.toString() === req.user._id.toString()) || req.user.permissions[0]) {
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

  // Else throw an authentication error
  } else {
    res.json({ error: 'unauthorized' });
    return console.log(`unauthorized request: ${req.url} \n from user: ${req.user} \n with post body: ${JSON.stringify(req.body)}`);
  }
};

exports.adjudicate = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });
  const companyHourLog = await CompanyHourLog.findOne({ _id: timeEntry.companyHourLog }).populate('timeEntries');

  // If transferring the timeEntry to another companies companyHourLog
  if (timeEntry.publicCompany.toString() !== req.body.company.toString()) {
    await companyHourLog.update({ $pull: { timeEntries: timeEntry._id } });

    let receivingCompanyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: req.body.company });
    // If there's no current companyHourLog for the company that a timeEntry is being transferred to, create one
    if (!receivingCompanyHourLog) {
      receivingCompanyHourLog = await (new CompanyHourLog({
        company: req.body.company,
        timeEntries: timeEntry._id,
        dateClosed: new Date(0),
      })).save();
    } else if (receivingCompanyHourLog) {
      await receivingCompanyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } });
      await receivingCompanyHourLog.save();
    }
    timeEntry.companyHourLog = receivingCompanyHourLog._id;
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
    await timeEntry.update({ $set: { status: 'approved' } }, { new: true });
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
      }));
      timeEntry.companyHourLog = companyHourLog._id;
    } else if (companyHourLog) {
      await companyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
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
    await timeEntry.update({ $set: { status: 'hidden' } }, { new: true });
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
      }));
      timeEntry.companyHourLog = companyHourLog._id;
    } else if (companyHourLog) {
      await companyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
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
  const rejectedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId });
  await rejectedTimeEntry.update({ $set: { status: 'rejected' } }, { new: true });
  const companyHourLog = await CompanyHourLog.findOne({ _id: rejectedTimeEntry.companyHourLog }).populate('timeEntries');

  const newTimeEntry = await new TimeEntry({
    user: rejectedTimeEntry.user,
    company: rejectedTimeEntry.company,
    contractorHourLog: rejectedTimeEntry.contractorHourLog,
    date: rejectedTimeEntry.date,
    hours: rejectedTimeEntry.hours,
    description: rejectedTimeEntry.description,
    publicUser: rejectedTimeEntry.user,
    publicCompany: rejectedTimeEntry.company,
    publicDate: rejectedTimeEntry.date,
    publicHours: rejectedTimeEntry.hours,
    publicDescription: rejectedTimeEntry.description,
    status: 'created',
  }).save();

  await rejectedTimeEntry.save();
  await companyHourLog.save();

  rejectSubmittedTimeEntryInCurrentContractorHourLog(rejectedTimeEntry, newTimeEntry);

  const populatedRejectedTimeEntry = await TimeEntry.findOne({ _id: rejectedTimeEntry._id }).populate('user publicUser company publicCompany');
  const populatedNewTimeEntry = await TimeEntry.findOne({ _id: newTimeEntry._id }).populate('user publicUser company publicCompany');

  res.json({ rejectedTimeEntry: populatedRejectedTimeEntry, newTimeEntry: populatedNewTimeEntry });
};

exports.submit = async (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = await TimeEntry.findOne({ _id: timeEntryId });

  // The user must own the timeEntry or be an admin to submit it
  if (req.user.permissions[0].admin || timeEntry.user.toString() === req.user._id.toString()) {
    if (timeEntry.companyHourLog) {
      await timeEntry.update({ $set: { status: 'submitted' } }, { new: true });
      await timeEntry.save();

      res.json(timeEntry);
    } else if (!timeEntry.companyHourLog) {
      let companyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: timeEntry.company });

      if (!companyHourLog) {
        companyHourLog = await (new CompanyHourLog({
          company: timeEntry.company,
          timeEntries: timeEntry._id,
          dateClosed: new Date(0),
        }));
        timeEntry.companyHourLog = companyHourLog._id;
      } else if (companyHourLog) {
        await companyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
        timeEntry.companyHourLog = companyHourLog._id;
      }
      await timeEntry.update({ $set: { status: 'submitted' } }, { new: true });
      await companyHourLog.save();
      await timeEntry.save();

      const populatedTimeEntry = await TimeEntry.findOne({ _id: timeEntryId }).populate('user publicUser company publicCompany');

      res.json(populatedTimeEntry);
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
  const contractorHourLog = await ContractorHourLog.findOne({ title: 'Current', user: timeEntry.user });
  await contractorHourLog.update({ $pull: { timeEntries: timeEntry._id } }, { new: true });
  await contractorHourLog.save();
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
    await createOrAppendCurrentCompanyHourLog(status, timeEntry);
    timeEntry.status = status;
    await timeEntry.save();
    await createOrAppendCurrentContractorHourLog(req.user._id, req.user.hourlyRate, timeEntry);
  }

  res.json('');
};

exports.companyHourLogTimeEntryBulkAction = async (req, res) => {
  const { companyHourLogId, currentStatus, receivingStatus } = req.params;

  const timeEntries = await TimeEntry.find({ companyHourLog: companyHourLogId, status: currentStatus });

  if (receivingStatus === 'rejected') {
    for (let i = 0; i < timeEntries.length; i++) {
      const rejectedTimeEntry = timeEntries[i];
      rejectedTimeEntry.status = receivingStatus;
      await rejectedTimeEntry.save();

      const newTimeEntry = await new TimeEntry({
        user: rejectedTimeEntry.user,
        company: rejectedTimeEntry.company,
        contractorHourLog: rejectedTimeEntry.contractorHourLog,
        date: rejectedTimeEntry.date,
        hours: rejectedTimeEntry.hours,
        description: rejectedTimeEntry.description,
        publicUser: rejectedTimeEntry.user,
        publicCompany: rejectedTimeEntry.company,
        publicDate: rejectedTimeEntry.date,
        publicHours: rejectedTimeEntry.hours,
        publicDescription: rejectedTimeEntry.description,
        status: 'created',
      }).save();
      rejectSubmittedTimeEntryInCurrentContractorHourLog(rejectedTimeEntry, newTimeEntry);
    }
    return res.json('');
  }

  for (let i = 0; i < timeEntries.length; i++) {
    const timeEntry = timeEntries[i];
    timeEntry.status = receivingStatus;
    await timeEntry.save();
  }
  res.json('');
};

exports.contractorHourLogTimeEntryBulkReject = async (req, res) => {
  const { contractorHourLogId } = req.params;
  const timeEntries = await TimeEntry.find({ contractorHourLog: contractorHourLogId, $or: [{ status: 'submitted' }, { status: 'approved' }, { status: 'hidden' }] });
  for (let i = 0; i < timeEntries.length; i++) {
    const rejectedTimeEntry = timeEntries[i];
    await rejectedTimeEntry.update({ $set: { status: 'rejected' } });
    const newTimeEntry = await new TimeEntry({
      user: rejectedTimeEntry.user,
      company: rejectedTimeEntry.company,
      contractorHourLog: rejectedTimeEntry.contractorHourLog,
      date: rejectedTimeEntry.date,
      hours: rejectedTimeEntry.hours,
      description: rejectedTimeEntry.description,
      publicUser: rejectedTimeEntry.user,
      publicCompany: rejectedTimeEntry.company,
      publicDate: rejectedTimeEntry.date,
      publicHours: rejectedTimeEntry.hours,
      publicDescription: rejectedTimeEntry.description,
      status: 'created',
    }).save();
    await rejectedTimeEntry.save();
    rejectSubmittedTimeEntryInCurrentContractorHourLog(rejectedTimeEntry, newTimeEntry);
  }
  res.json('');
};

exports.contractorHourLogTimeEntryBulkSubmit = async (req, res) => {
  const { contractorHourLogId } = req.params;
  const timeEntries = await TimeEntry.find({ contractorHourLog: contractorHourLogId, status: 'created' });
  for (let i = 0; i < timeEntries.length; i++) {
    const timeEntry = timeEntries[i];
    timeEntry.status = 'submitted';
    await timeEntry.save();
    await createOrAppendCurrentCompanyHourLog('submitted', timeEntry);
  }
  res.json('');
};

exports.contractorHourLogTimeEntryBulkDelete = async (req, res) => {
  const { contractorHourLogId } = req.params;
  const contractorHourLog = await ContractorHourLog.findOne({ _id: contractorHourLogId });
  const timeEntries = await TimeEntry.find({ contractorHourLog: contractorHourLogId, status: 'created' });
  for (let i = 0; i < timeEntries.length; i++) {
    const timeEntry = timeEntries[i];
    await TimeEntry.findOneAndDelete({ _id: timeEntry._id });
    await contractorHourLog.update({ $pull: { timeEntries: timeEntry._id } });
  }
  await contractorHourLog.save();
  res.json('');
};

/**
 * Helper functions
 */

async function createOrAppendCurrentCompanyHourLog(status, timeEntry) {
  let companyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: timeEntry.company });

  // If there's no current companyHourLog create one
  if (!companyHourLog) {
    companyHourLog = await (new CompanyHourLog({
      company: timeEntry.company,
      timeEntries: timeEntry._id,
      dateClosed: new Date(0),
    }));
    timeEntry.companyHourLog = companyHourLog._id;
  }

  // If there is a current companyHourLog append to it
  else if (companyHourLog) {
    await companyHourLog.update({ $addToSet: { timeEntries: timeEntry._id } }, { new: true });
    timeEntry.companyHourLog = companyHourLog._id;
  }
  await timeEntry.save();
  await companyHourLog.save();
}

async function createOrAppendCurrentContractorHourLog(userId, hourlyRate, timeEntry) {
  let contractorHourLog = await ContractorHourLog.findOne({ title: 'Current', user: userId });

  // If there's no current contractorHourLog for the user that a timeEntry is being created for, create one
  if (!contractorHourLog) {
    contractorHourLog = await (new ContractorHourLog({
      user: timeEntry.user,
      timeEntries: timeEntry._id,
      dateClosed: new Date(0),
      hourlyRate,
    })).save();
    // Else append to the current contractorHourLog
  } else if (contractorHourLog) {
    await contractorHourLog.update({ $addToSet: { timeEntries: timeEntry._id } });
  }
  timeEntry.contractorHourLog = contractorHourLog._id;

  await contractorHourLog.save();
  await timeEntry.save();
}

async function rejectSubmittedTimeEntryInCurrentContractorHourLog(rejectedTimeEntry, newTimeEntry) {
  const contractorHourLog = await ContractorHourLog.findOne({ title: 'Current', user: rejectedTimeEntry.user });
  await contractorHourLog.update({ $pull: { timeEntries: rejectedTimeEntry._id } }, { new: true });
  await contractorHourLog.update({ $addToSet: { timeEntries: newTimeEntry._id } }, { new: true });
  await contractorHourLog.save();
}
