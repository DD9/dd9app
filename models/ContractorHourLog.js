const mongoose = require('mongoose');

const { Schema } = mongoose;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const contractorHourLogSchema = new Schema({
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  timeEntries: [{
    type: mongoose.Schema.ObjectId,
    ref: 'TimeEntry',
  }],
  title: {
    type: String,
    default: 'Current',
  },
  hourlyRate: {
    type: Array,
    default: [{
      USD: 0,
    }],
  },
  totalCreatedHours: {
    type: Number,
    default: 0,
  },
  totalSubmittedHours: {
    type: Number,
    default: 0,
  },
  totalPayment: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});

contractorHourLogSchema.index(
  { title: 1 },
);

contractorHourLogSchema.plugin(deepPopulate, {
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

module.exports = mongoose.model('ContractorHourLog', contractorHourLogSchema);
