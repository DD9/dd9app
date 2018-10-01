const mongoose = require('mongoose');

const HourLog = mongoose.model('HourLog');

exports.openHourLogs = async (req, res) => {
  const openHourLogs = await HourLog.find({ dateClosed: new Date(0) }).populate('company');
  res.json(openHourLogs);
};

exports.closedHourLogs = async (req, res) => {
  const closedHourLogs = await HourLog.find({ dateClosed: { $ne: new Date(0) } }).populate('company').limit(200).sort({ dateOpened: -1 });
  res.json(closedHourLogs);
};

exports.one = async (req, res) => {
  const { hourLogId } = req.params
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

  if (!currentHourLog) {
    closingHourLog.title = 'Current';
    closingHourLog.dateOpened = new Date();
    closingHourLog.dateClosed = new Date(0);
    await closingHourLog.save();
    return res.json(closingHourLog);
  }
  if (currentHourLog) {
    currentHourLog.totalPublicHours += closingHourLog.totalPublicHours;
    currentHourLog.totalHiddenHours += closingHourLog.totalHiddenHours;
    await currentHourLog.updateOne({ $addToSet: { timeEntries: closingHourLog.timeEntries } });

    for (let i = 0; i < closingHourLog.timeEntries.length; i++) {
      const timeEntry = closingHourLog.timeEntries[i];
      timeEntry.hourLog = currentHourLog._id;
      await timeEntry.save();
    }

    await closingHourLog.remove();
    await currentHourLog.save();
    return res.json(currentHourLog);
  }
};

exports.close = async (req, res) => {
  const { hourLogId } = req.params;
  const hourLog = await HourLog.findOne({ _id: hourLogId })

  if (hourLog.totalSubmittedHours > 0 || req.body.title.toLowerCase() === 'current') {
    return res.json(hourLog);
  }

  if (hourLog.totalPublicHours === 0 && hourLog.totalHiddenHours === 0 && hourLog.totalSubmittedHours === 0) {
    await hourLog.remove();
    return res.json({ redirectUrl: `/company/${hourLog.company._id}`, companyId: hourLog.company._id });
  }

  hourLog.title = req.body.title;
  hourLog.dateClosed = new Date();
  await hourLog.save();

  res.json(hourLog);
};
