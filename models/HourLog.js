const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Prevent false positives from mongoose promise library deprication

const hourLogSchema = new Schema({
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
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  title: {
    type: String
  }
});

hourLogSchema.pre('save', function(next) {
  this.updatedAt = Date.now;
  next();
});

module.exports = mongoose.model('HourLog', hourLogSchema);