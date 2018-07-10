const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Prevent false positives from mongoose promise library deprication

const companySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  _id: {
    type: mongoose.Schema.ObjectId
  },
  name: {
    type: String,
    required: 'Please supply a company name'
  },
  active: {
    type: Boolean,
    default: true
  },
  memo: {
    type: String
  }
});

companySchema.pre('save', function(next) {
  this.updatedAt = Date.now;
  next();
});

module.exports = mongoose.model('Company', companySchema);