const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Prevent false positives from mongoose promise library deprication

const hourLogSchema = new Schema({
  dateOpened: {
    type: Date,
    default: Date.now
  },
  dateClosed: {
    type: Date
  },
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  timeEntries: [{
    type: mongoose.Schema.ObjectId,
    ref: 'TimeEntry',
  }],
  title: {
    type: String,
    default: "Current"
  },
  totalPublicHours: {
    type: Number,
  },
  totalHiddenHours: {
    type: Number,
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

module.exports = mongoose.model('HourLog', hourLogSchema);