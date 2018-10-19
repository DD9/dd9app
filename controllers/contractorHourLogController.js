const mongoose = require('mongoose');

const ContractorHourLog = mongoose.model('ContractorHourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.openCompanyHourLogs = async (req, res) => {
  const openCompanyHourLogs = await ContractorHourLog.find({ dateClosed: new Date(0) }).populate('company');
res.json(openCompanyHourLogs);
};