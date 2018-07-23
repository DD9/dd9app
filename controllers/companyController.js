const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const HourLog = mongoose.model('HourLog');

exports.all = async (req, res) => {
  const companies = await Company.find();
  res.render("company/all", { title: "Companies", companies: companies });
};

exports.getById = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOne({ _id: companyId });
  const hourLogs = await HourLog.find({ company : companyId });
  res.render("company/one", { title: company.name, company: company, hourLogs: hourLogs });
};

exports.create = async (req, res) => {
  const company = await (new Company(req.body)).save();
  req.flash('success', `Successfully created ${company.name}`);
  res.redirect(`/company/${company._id}`);
};

exports.edit = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, req.body).exec();
  req.flash('success', `Successfully edited ${company.name}`);
  res.redirect(`/company/${company._id}`);
};

exports.activate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, { active: true }).exec();
  req.flash('success', `Successfully activated ${company.name}`);
  res.redirect(`/company/${company._id}`);
};

exports.deactivate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, { active: false }).exec();
  req.flash('success', `Successfully deactivated ${company.name}`);
  res.redirect(`/company/${company._id}`);
};

exports.delete = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndRemove({ _id: companyId }).exec();
  req.flash('success', `Successfully deleted ${company.name}`);
  res.redirect(`/company/all`);
};