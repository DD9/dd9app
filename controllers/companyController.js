const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const HourLog = mongoose.model('HourLog');

exports.all = async (req, res) => {
  const companies = await Company.find();
  res.render("company/all", { title: "Companies", companies: companies });
};

exports.one = async (req, res) => {
  const companyName = req.params.name;
  const company = await Company.findOne({ name: companyName }).select('name status');
  const companies = await Company.find().select('name');
  const hourLogs = await HourLog.find({ company : company._id }).select('dateOpened dateClosed title totalPublicHours totalHiddenHours');
  res.render("company/one", { title: company.name, company, companies, hourLogs });
};

exports.create = async (req, res) => {
  const company = await (new Company(req.body)).save();
  req.flash('success', `Successfully created ${company.name}`);
  res.json(company);
};

exports.edit = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, req.body, { new: true }).select('name');
  req.flash('success', `Successfully edited ${company.name}`);
  res.json(company);
};

exports.activate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, { status: "active" });
  req.flash('success', `Successfully activated ${company.name}`);
  res.json('');
};

exports.deactivate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, { status: "inactive" });
  req.flash('success', `Successfully deactivated ${company.name}`);
  res.json('');
};