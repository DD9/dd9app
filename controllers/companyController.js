const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const HourLog = mongoose.model('HourLog');

exports.all = async (req, res) => {
  const companies = await Company.find();
  res.render("company/all", { title: "Companies", companies: companies });
};

exports.one = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOne({ _id: companyId });
  const hourLogs = await HourLog.find({ company : companyId });
  res.render("company/one", { title: company.name, company, hourLogs });
};

exports.create = async (req, res) => {
  const company = await (new Company(req.body)).save();
  req.flash('success', `Successfully created ${company.name}`);
  res.json(company);
};

exports.edit = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, req.body, { new: true });
  req.flash('success', `Successfully edited ${company.name}`);
  res.json(company);
};

exports.activate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, { status: "active" });
  req.flash('success', `Successfully activated ${company.name}`);
  res.redirect(`/company/${company._id}`);
};

exports.deactivate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, { status: "inactive" });
  req.flash('success', `Successfully deactivated ${company.name}`);
  res.redirect(`/company/${company._id}`);
};