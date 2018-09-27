const mongoose = require('mongoose');

const { Schema } = mongoose;

const timeEntrySchema = new Schema({
  date: {
    type: Date,
    required: 'Date required.',
  },
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'User required.',
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: 'Company required.',
  },
  hourLog: {
    type: mongoose.Schema.ObjectId,
    ref: 'HourLog',
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
    required: 'Status required.',
  },
  publicUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Public user required.',
  },
  publicCompany: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: 'Public company required.',
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
},
{
  timestamps: true,
});

timeEntrySchema.index({
  status: 1,
  user: -1,
});


module.exports = mongoose.model('TimeEntry', timeEntrySchema);
