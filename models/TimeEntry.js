const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeEntrySchema = new Schema({
  date: {
    type: Date
  },
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  hourLog: {
    type: mongoose.Schema.ObjectId,
    ref: 'HourLog'
  },
  hours: {
    type: Number
  },
  description: {
    type: String
  },
  status: {
    type: String
  },
  publicUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  publicCompany: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  publicDate: {
    type: Date
  },
  publicHours: {
    type: Number
  },
  publicDescription: {
    type: String
  },
  memo: {
    type: String,
    default: ''
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('TimeEntry', timeEntrySchema);