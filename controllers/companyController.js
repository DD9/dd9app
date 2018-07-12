const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const HourLog = mongoose.model('HourLog');

exports.getCompanyById = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findOne({ _id: companyId });
  const hourLogs = await HourLog.find({ companyId : companyId });
  console.log(hourLogs)
  res.render("company/one", { title: company.name, company: company, hourLogs: hourLogs});
};