const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    default: 0
  },
  totalHiddenHours: {
    type: Number,
    default: 0
  },
  totalSubmittedHours: {
    type: Number,
    default: 0
  }
},
  {
    timestamps: true
  }
);

hourLogSchema.index(
  { title: 1 },
);

module.exports = mongoose.model('HourLog', hourLogSchema);