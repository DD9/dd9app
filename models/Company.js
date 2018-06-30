const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Prevent false positives from mongoose promise library deprication

const companySchema = new Schema({
  v1_id: {
    type: Number
  },
  name: {
    type: String,
    required: 'Please supply a company name'
  },
  active: {
    type: Boolean,
    default: true
  },
  v1_created_at: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  v1_updated_at: {
    type: String
  },
  updated_at: {
    type: Date
  },
  memo: {
    type: String
  }
});

companySchema.pre('save', function(next) {
  this.updated_at = Date.now;
  next();
});

module.exports = mongoose.model('Company', companySchema);