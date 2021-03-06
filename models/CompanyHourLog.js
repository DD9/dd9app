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
  notes: {
    type: String,
  },
},
{
  timestamps: true,
});

companyHourLogSchema.set('toObject', { virtuals: true });
companyHourLogSchema.set('toJSON', { virtuals: true });

companyHourLogSchema.virtual('totalPublicHours').get(function () {
  return this.timeEntries.filter(timeEntry => timeEntry.status === 'approved').reduce((prev, next) => prev + next.publicHours, 0);
});

companyHourLogSchema.virtual('totalHiddenHours').get(function () {
  return this.timeEntries.filter(timeEntry => timeEntry.status === 'hidden').reduce((prev, next) => prev + next.publicHours, 0);
});

companyHourLogSchema.virtual('totalSubmittedHours').get(function () {
  return this.timeEntries.filter(timeEntry => timeEntry.status === 'submitted').reduce((prev, next) => prev + next.publicHours, 0);
});

companyHourLogSchema.index(
  { title: 1 },
);

companyHourLogSchema.plugin(deepPopulate, {
  populate: {
    'timeEntries.user': {
      select: 'name',
    },
    'timeEntries.publicUser': {
      select: 'name',
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
