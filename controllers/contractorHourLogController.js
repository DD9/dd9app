const mongoose = require('mongoose');

const ContractorHourLog = mongoose.model('ContractorHourLog');

exports.openHourLogs = async (req, res) => {
  const openContractorHourLogs = await ContractorHourLog.find({ dateClosed: new Date(0) })
    .populate('user', 'name hourlyRate');

  res.json(openContractorHourLogs);
};

exports.closedHourLogs = async (req, res) => {
  const closedContractorHourLogs = await ContractorHourLog.find({ dateClosed: { $ne: new Date(0) } })
    .populate('user', 'name hourlyRate')
    .limit(200)
    .sort({ dateOpened: -1 });

  res.json(closedContractorHourLogs);
};

exports.one = async (req, res) => {
  const { contractorHourLogId } = req.params;
  const contractorHourLog = await ContractorHourLog.findOne({ _id: contractorHourLogId })
    .populate('user', 'name hourlyRate')
    .populate('timeEntries', 'user publicUser company publicCompany publicHours publicDescription')
    .deepPopulate('timeEntries.user timeEntries.publicUser timeEntries.company timeEntries.publicCompany', err => {
      if (err) {
        console.log(err);
      }
    });
  console.log(contractorHourLog);
  res.json(contractorHourLog);
};
