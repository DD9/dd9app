const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeEntrySchema = new Schema({
  date: {
    type: Date,
    required: 'Date required.',
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
    type: Number,
    required: 'Hours required.',
  },
  description: {
    type: String,
    required: 'Description required.',
  },
  status: {
    type: String,
    default: "submitted"
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
    type: Date,
    required: 'Public date required.',
  },
  publicHours: {
    type: Number,
    required: 'Public hours required.',
  },
  publicDescription: {
    type: String,
    required: 'Public description required.',
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