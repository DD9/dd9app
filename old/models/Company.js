const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: "Please supply a company name",
    maxlength: 100
  },
  status: {
    type: String,
    default: "active"
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

companySchema.index(
  { active: 1 },
  { dateClosed: -1},
);

module.exports = mongoose.model('Company', companySchema);