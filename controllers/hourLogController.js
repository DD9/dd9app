const mongoose = require('mongoose');

const HourLog = mongoose.model('HourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.openHourLogs = async (req, res) => {
  const openHourLogs = await HourLog.find({ dateClosed: new Date(0) }).populate('company');
  res.json(openHourLogs);
};

exports.closedHourLogs = async (req, res) => {
  const closedHourLogs = await HourLog.find({ dateClosed: { $ne: new Date(0) } }).populate('company').limit(200).sort({ dateOpened: -1 });
  res.json(closedHourLogs);
};

exports.one = async (req, res) => {
  const { hourLogId } = req.params;
  const hourLog = await HourLog.findOne({ _id: hourLogId })
    .populate('company', 'name')
    .populate('timeEntries', 'user publicUser company publicCompany publicHours publicDescription')
    .deepPopulate('timeEntries.user timeEntries.publicUser timeEntries.company timeEntries.publicCompany', err => {
      if (err) {
        console.log(err);
      }
    });
  res.json(hourLog);
};

exports.open = async (req, res) => {
  const { hourLogId } = req.params;

  const closingHourLog = await HourLog.findOne({ _id: hourLogId }).populate('timeEntries');
  const currentHourLog = await HourLog.findOne({ title: 'Current', company: closingHourLog.company }).populate('timeEntries');


  // If there's no current hourLog for this company, make this hourLog the new Current hourLog
  if (!currentHourLog) {
    closingHourLog.title = 'Current';
    closingHourLog.dateOpened = new Date();
    closingHourLog.dateClosed = new Date(0);
    await closingHourLog.save();
    return res.json(closingHourLog);
  }
  // If there is a Current hourLog, merge the timeEntries in this hourLog with the Current hourLog
  if (currentHourLog) {
    currentHourLog.totalPublicHours += closingHourLog.totalPublicHours;
    currentHourLog.totalHiddenHours += closingHourLog.totalHiddenHours;
    await currentHourLog.updateOne({ $addToSet: { timeEntries: closingHourLog.timeEntries } });

    for (let i = 0; i < closingHourLog.timeEntries.length; i++) {
      const timeEntryId = closingHourLog.timeEntries[i]._id;
      await TimeEntry.findOneAndUpdate({ _id: timeEntryId }, { hourLog: currentHourLog._id });
    }

    await closingHourLog.remove();
    await currentHourLog.save();
    return res.json(currentHourLog);
  }
};

exports.close = async (req, res) => {
  const { hourLogId } = req.params;
  const hourLog = await HourLog.findOne({ _id: hourLogId }).populate('timeEntries');

  // If closing an hourLog with submitted timeEntries, move the timeEntries to a new Current hourLog
  if (hourLog.totalSubmittedHours > 0) {
    const recievingHourLog = await (new HourLog({
      company: hourLog.company,
      dateClosed: new Date(0),
    })).save();
    let totalSubmittedHours = 0;
    for (let i = 0; i < hourLog.timeEntries.length; i++) {
      const timeEntry = hourLog.timeEntries[i];
      if (timeEntry.status === 'submitted') {
        totalSubmittedHours += timeEntry.publicHours;
        await recievingHourLog.update({ $addToSet: { timeEntries: timeEntry._id } });
        await hourLog.update({ $pull: { timeEntries: timeEntry._id } });
        await TimeEntry.findOneAndUpdate({ _id: timeEntry._id }, { hourLog: recievingHourLog._id });
      }
    }
    hourLog.totalSubmittedHours = 0;
    recievingHourLog.totalSubmittedHours = totalSubmittedHours;
    await recievingHourLog.save();
  }

  // Delete an hourLog if it's empty
  if (hourLog.totalPublicHours === 0 && hourLog.totalHiddenHours === 0 && hourLog.totalSubmittedHours === 0) {
    await hourLog.remove();
    return res.json({ redirectUrl: `/company/${hourLog.company._id}`, companyId: hourLog.company._id });
  }

  hourLog.title = req.body.title;
  hourLog.dateClosed = new Date();

  await hourLog.save();

  res.json(hourLog);
};

exports.edit = async (req, res) => {
  const { hourLogId } = req.params;
  const hourLog = await HourLog.findOneAndUpdate({ _id: hourLogId }, req.body, { new: true });
  res.json(hourLog);
};
