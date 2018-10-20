const mongoose = require('mongoose');

const ContractorHourLog = mongoose.model('ContractorHourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.openHourLogs = async (req, res) => {
  const openContractorHourLogs = await ContractorHourLog.find({ dateClosed: new Date(0) }).populate('company user');
  res.json(openContractorHourLogs);
};

exports.closedHourLogs = async (req, res) => {
  const closedContractorHourLogs = await ContractorHourLog.find({ dateClosed: { $ne: new Date(0) } }).populate('company user').limit(200).sort({ dateOpened: -1 });
  res.json(closedContractorHourLogs);
};
