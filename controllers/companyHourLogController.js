const mongoose = require('mongoose');

const CompanyHourLog = mongoose.model('CompanyHourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.openHourLogs = async (req, res) => {
  const openCompanyHourLogs = await CompanyHourLog.find({ dateClosed: new Date(0) })
    .populate('timeEntries', 'status publicHours')
    .populate('company', 'name');
  if (!openCompanyHourLogs[0]) return res.json('empty');
  res.json(openCompanyHourLogs);
};

exports.closedHourLogs = async (req, res) => {
  const closedCompanyHourLogs = await CompanyHourLog.find({ dateClosed: { $ne: new Date(0) } })
    .populate('timeEntries', 'status publicHours')
    .populate('company', 'name')
    .sort({ dateOpened: -1 })
    .limit(200);
  if (!closedCompanyHourLogs[0]) return res.json('empty');
  res.json(closedCompanyHourLogs);
};

exports.one = async (req, res) => {
  const { companyHourLogId } = req.params;
  const companyHourLog = await CompanyHourLog.findOne({ _id: companyHourLogId })
    .populate('company', 'name')
    .populate('timeEntries', 'user publicUser company publicCompany publicHours publicDescription')
    .deepPopulate('timeEntries.user timeEntries.publicUser timeEntries.company timeEntries.publicCompany', err => {
      if (err) {
        console.log(err);
      }
    });
  if (!companyHourLog.timeEntries[0]) {
    companyHourLog.timeEntries.push('empty');
  }
  res.json(companyHourLog);
};

exports.open = async (req, res) => {
  const { companyHourLogId } = req.params;

  const closingCompanyHourLog = await CompanyHourLog.findOne({ _id: companyHourLogId }).populate('timeEntries');
  const currentCompanyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: closingCompanyHourLog.company }).populate('timeEntries');


  // If there's no current companyHourLog for this company, make this companyHourLog the new Current companyHourLog
  if (!currentCompanyHourLog) {
    closingCompanyHourLog.title = 'Current';
    closingCompanyHourLog.dateOpened = new Date();
    closingCompanyHourLog.dateClosed = new Date(0);
    await closingCompanyHourLog.save();
    return res.json(closingCompanyHourLog);
  }
  // If there is a Current companyHourLog, merge the timeEntries in this companyHourLog with the Current companyHourLog
  if (currentCompanyHourLog) {
    await currentCompanyHourLog.updateOne({ $addToSet: { timeEntries: closingCompanyHourLog.timeEntries } });

    for (let i = 0; i < closingCompanyHourLog.timeEntries.length; i++) {
      const timeEntryId = closingCompanyHourLog.timeEntries[i]._id;
      await TimeEntry.findOneAndUpdate({ _id: timeEntryId }, { companyHourLog: currentCompanyHourLog._id });
    }

    await closingCompanyHourLog.remove();
    await currentCompanyHourLog.save();
    return res.json(currentCompanyHourLog);
  }
};

exports.close = async (req, res) => {
  const { companyHourLogId } = req.params;
  let companyHourLog = await CompanyHourLog.findOne({ _id: companyHourLogId }).populate('timeEntries');

  // If closing an companyHourLog with submitted timeEntries, move the timeEntries to a new Current companyHourLog
  if (companyHourLog.totalSubmittedHours > 0) {
    const recievingHourLog = await (new CompanyHourLog({
      company: companyHourLog.company,
      dateClosed: new Date(0),
    })).save();
    for (let i = 0; i < companyHourLog.timeEntries.length; i++) {
      const timeEntry = companyHourLog.timeEntries[i];
      if (timeEntry.status === 'submitted') {
        await recievingHourLog.update({ $addToSet: { timeEntries: timeEntry._id } });
        await companyHourLog.update({ $pull: { timeEntries: timeEntry._id } });
        await TimeEntry.findOneAndUpdate({ _id: timeEntry._id }, { companyHourLog: recievingHourLog._id });
      }
    }
    companyHourLog.title = req.body.title;
    companyHourLog.notes = req.body.notes;
    companyHourLog.dateClosed = new Date();

    await companyHourLog.save();
    await recievingHourLog.save();
  }

  // Delete a companyHourLog if it's empty
  companyHourLog = await CompanyHourLog.findOne({ _id: companyHourLogId }).populate('timeEntries');
  if (companyHourLog.totalPublicHours === 0 && companyHourLog.totalHiddenHours === 0 && companyHourLog.totalSubmittedHours === 0) {
    await companyHourLog.remove();
    return res.json({ redirectUrl: `/company/${companyHourLog.company._id}`, companyId: companyHourLog.company._id });
  }

  companyHourLog.title = req.body.title;
  companyHourLog.notes = req.body.notes;
  companyHourLog.dateClosed = new Date();
  await companyHourLog.save();

  res.json(companyHourLog);
};

exports.edit = async (req, res) => {
  const { companyHourLogId } = req.params;
  const companyHourLog = await CompanyHourLog.findOneAndUpdate({ _id: companyHourLogId }, req.body, { new: true });
  res.json(companyHourLog);
};
