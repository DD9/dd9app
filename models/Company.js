const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Prevent false positives from mongoose promise library deprication

const companySchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: 'Server Side Validation: Please supply a company name',
    maxlength: 50
  },
  active: {
    type: Boolean,
    default: true
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


// Unique index on company names to server side validate duplicate company names
companySchema.index(
  { name: 1 },
  { unique: true }
);

module.exports = mongoose.model('Company', companySchema);