const mongoose = require('mongoose');

const { Schema } = mongoose;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const companyHourLogSchema = new Schema({
  dateOpened: {
    type: Date,
    default: Date.now,
  },
  dateClosed: {
    type: Date,
  },
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true,
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
  },
  timeEntries: [{
    type: mongoose.Schema.ObjectId,
    ref: 'TimeEntry',
  }],
  title: {
    type: String,
    default: 'Current',
  },
  totalPublicHours: {
    type: Number,
    default: 0,
  },
  totalHiddenHours: {
    type: Number,
    default: 0,
  },
  totalSubmittedHours: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});

companyHourLogSchema.index(
  { title: 1 },
);

companyHourLogSchema.plugin(deepPopulate, {
  populate: {
    'timeEntries.user': {
      select: 'name hourlyRate',
    },
    'timeEntries.publicUser': {
      select: 'name hourlyRate',
    },
    'timeEntries.company': {
      select: 'name',
    },
    'timeEntries.publicCompany': {
      select: 'name',
    },
  },
});

module.exports = mongoose.model('CompanyHourLog', companyHourLogSchema);
