const mongoose = require('mongoose');

const Company = mongoose.model('Company');
const CompanyHourLog = mongoose.model('CompanyHourLog');

exports.all = async (req, res) => {
  const companies = await Company.find();
  if (!companies[0]) return res.json('empty');
  res.json(companies);
};

exports.active = async (req, res) => {
  const companies = await Company.find({ status: 'active' }).sort('name');
  res.json(companies);
};

exports.one = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOne({ _id: companyId });
  res.json(company);
};

exports.create = async (req, res) => {
  const company = await (new Company(req.body)).save();
  res.json(company);
};

exports.edit = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, { name: req.body.name }, { new: true });
  res.json(company);
};

exports.activate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, { status: 'active' }, { new: true });
  res.json(company);
};

exports.deactivate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOne({ _id: companyId });
  const openCompanyHourLog = await CompanyHourLog.findOne({ company: companyId, title: 'Current', dateClosed: new Date(0) });
  if (openCompanyHourLog) {
    return res.json(company);
  }
  company.status = 'inactive';
  await company.save();
  return res.json(company);
};

exports.companyHourLogs = async (req, res) => {
  const companyId = req.params.id;
  const companyHourLogs = await CompanyHourLog.find({ company: companyId }).populate('timeEntries', 'status publicHours');
  if (!companyHourLogs[0]) return res.json('empty');
  res.json(companyHourLogs);
};
