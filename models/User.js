const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Prevent false positives from mongoose promise library deprication
const md5 = require('md5');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseErrorHanlder = require('mongoose-mongodb-errors');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
  v1_id: {
    type: Number
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  v1_sign_in_count: {
    type: Number
  },
  sign_in_count: {
    type: Number,
  },
  v1_last_sign_in_at: {
    type: String
  },
  last_sign_in_at: {
    type: Date
  },
  v1_last_sign_in_ip: {
    type: String
  },
  last_sign_in_ip: {
    type: String
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
  first_name: {
    type: String,
    required: 'Please supply a first name',
    trim: true
  },
  last_name: {
    type: String,
    required: 'Please supply a last name',
    trim: true
  },
  role: {
    type: String,
    default: 'staff'
  },
  clearance_level: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  v1_company_id: {
    type: Number,
  },
  company_id: {
    type: mongoose.Schema.ObjectId,
  },
  active: {
    type: Boolean,
    default: true
  },
  hour_log_email: {
    type: String,
    default: 'none'
  },
  memo: {
    type: String
  }
}, {
  toJSON: { virtuals : true},
  toObject: { virtuals : true},
});

// Companies where userCompanyV1Id == CompanyV1Id
userSchema.virtual('v1_company', {
  ref: 'Company',
  localField: 'v1_company_id',
  foreignField: 'v1_id'
});

// userSchema.virtual('company', {
//   ref: 'Company',
//   localField: 'company_id',
//   foreignField: '_id'
// });

// Rather than storing all the data, we can generate it on the fly
userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

// Compound index as text
userSchema.index({
  email: 'text',
  first_name: 'text',
  last_name: 'text'
});

// Serialize and deserialize sessions
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// PrettyPrint MongoDB errors if they're thrown by the server
userSchema.plugin(mongooseErrorHanlder);

// Depricated Mongo function required by Passport
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);