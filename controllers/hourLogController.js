const mongoose = require('mongoose');
const HourLog = mongoose.model('HourLog');

exports.all = async (req, res) => {
  const hourLogs = await HourLog.find().populate("company");
  res.render("hourLog/all", { title: "Hour Logs", hourLogs: hourLogs });
};

exports.one = async (req, res) => {
  const hourLogId = req.params.id;
  const hourLog = await HourLog.findOne({ _id: hourLogId })
    .populate("company timeEntries")
    .populate({
      path: 'timeEntries',
      populate: [{
        path: 'publicCompany',
        model: 'Company',
        select: 'name'
      },{
        path: 'publicUser',
        model: 'User',
        select: 'firstName lastName'
      }]
    });


  const approvedTimeEntries = [];
  const hiddenTimeEntries = [];
  const submittedTimeEntries = [];
  for (let i = 0; i < hourLog.timeEntries.length; i++) {
    let timeEntry = hourLog.timeEntries[i];
    switch (timeEntry.status) {
      case "approved":
        approvedTimeEntries.push(timeEntry);
        break;
      case "hidden":
        hiddenTimeEntries.push(timeEntry);
        break;
      case "submitted":
        submittedTimeEntries.push(timeEntry);
      default:
        break;
    }
  }

  console.log(`approvedTimeEntries`);
  console.log(approvedTimeEntries);

  console.log(`hiddenTimeEntries`);
  console.log(hiddenTimeEntries);

  console.log(`submittedTimeEntries`);
  console.log(submittedTimeEntries);

  res.render("hourLog/one", {
    title: hourLog.company.name,
    hourLog,
    approvedTimeEntries,
    hiddenTimeEntries,
    submittedTimeEntries
  });
};

exports.open = async (req, res) => {
  const hourLogId = req.params.id;
  const hourLog = await HourLog.findOneAndUpdate({ _id: hourLogId }, {dateClosed: Date.now()})
};