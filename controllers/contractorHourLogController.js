const mongoose = require('mongoose');

const ContractorHourLog = mongoose.model('ContractorHourLog');

exports.openHourLogs = async (req, res) => {
  const openContractorHourLogs = await ContractorHourLog.find({ dateClosed: new Date(0) })
    .populate('user', 'name hourlyRate')
    .populate('timeEntries', 'status hours');
  if (!openContractorHourLogs[0]) return res.json('empty');
  res.json(openContractorHourLogs);
};

exports.closedHourLogs = async (req, res) => {
  const closedContractorHourLogs = await ContractorHourLog.find({ dateClosed: { $ne: new Date(0) } })
    .populate('user', 'name hourlyRate')
    .populate('timeEntries', 'status hours')
    .limit(200)
    .sort({ dateOpened: -1 });
  if (!closedContractorHourLogs[0]) return res.json('empty');
  res.json(closedContractorHourLogs);
};

exports.one = async (req, res) => {
  const { contractorHourLogId } = req.params;
  const contractorHourLog = await ContractorHourLog.findOne({ _id: contractorHourLogId })
    .populate('user', 'name hourlyRate')
    .populate('timeEntries', 'user publicUser company publicCompany hours publicHours publicDescription')
    .deepPopulate('timeEntries.user timeEntries.publicUser timeEntries.company timeEntries.publicCompany', err => {
      if (err) {
        console.log(err);
      }
    });
  res.json(contractorHourLog);
};

exports.close = async (req, res) => {
  const { contractorHourLogId } = req.params;
  const contractorHourLog = await ContractorHourLog.findOne({ _id: contractorHourLogId }).populate('timeEntries');

  if (contractorHourLog.totalCreatedHours !== 0) {
    return res.json({ error: 'cannot close a contractor hour log containing created time entries, please submit them' });
  }

  // Delete a contractorHourLog if it's empty
  if (contractorHourLog.totalCreatedHours === 0 && contractorHourLog.totalSubmittedHours === 0) {
    await contractorHourLog.remove();
    return res.json({ redirectUrl: '/contractorHourLogs' });
  }

  contractorHourLog.title = req.body.title;
  contractorHourLog.notes = req.body.notes;
  contractorHourLog.dateClosed = new Date();

  await contractorHourLog.save();

  res.json(contractorHourLog);
};

exports.edit = async (req, res) => {
  const { contractorHourLogId } = req.params;
  const contractorHourLog = await ContractorHourLog.findOneAndUpdate({ _id: contractorHourLogId }, req.body, { new: true });
  res.json(contractorHourLog);
};
