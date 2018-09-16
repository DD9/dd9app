const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const HourLog = mongoose.model('HourLog');

exports.all = async (req, res) => {
  const companies = await Company.find().select('name status');
  res.json(companies);
};

exports.one = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOne({ _id: companyId }).select('name status');
  res.json(company);
};

// exports.one = async (req, res) => {
//   const companyId = req.params.id;
//   const company = await Company.findOne({ _id: companyId }).select('name status');
//   const companies = await Company.find().select('name');
//   const hourLogs = await HourLog.find({ company : company._id }).select('dateOpened dateClosed title totalPublicHours totalHiddenHours totalSubmittedHours');
//   res.render("company/companyOne", { title: company.name, company, companies, hourLogs });
// };

exports.active = async (req, res) => {
  const companies = await Company.find({ status: 'active' }).select('name').sort('name');
  res.json(companies);
};

exports.create = async (req, res) => {
  const company = await (new Company(req.body)).save();
  res.json(company);
};

exports.edit = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, req.body ).select('name');
  res.json(company);
};

exports.activate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOneAndUpdate({ _id: companyId }, { status: "active" });
  res.json(company);
};

exports.deactivate = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOne({ _id: companyId });
  const openHourLog = await HourLog.findOne({ company: companyId, title: "Current", dateClosed: new Date(0)});
  if (openHourLog) {
    return res.json({ company, hasOpenHourLog: true })
  } else {
    company.status = "inactive";
    await company.save();
    return res.json({ company, hasOpenHourLog: false });
  }
};