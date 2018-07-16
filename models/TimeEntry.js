  const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Prevent false positives from mongoose promise library deprication

const timeEntrySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  date: {
    type: Date
  },
  _id: {
    type: mongoose.Schema.ObjectId
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
  }
});

timeEntrySchema.pre('save', function(next) {
  this.updatedAt = Date.now;
  next();
});

module.exports = mongoose.model('TimeEntry', timeEntrySchema);