const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Prevent false positives from mongoose promise library deprication
const md5 = require('md5');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseErrorHanlder = require('mongoose-mongodb-errors');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
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
  companyId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  signInCount: {
    type: Number,
  },
  lastSignInAt: {
    type: Date
  },
  lastSignInIP: {
    type: String
  },
  firstName: {
    type: String,
    required: 'Please supply a first name',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Please supply a last name',
    trim: true
  },
  role: {
    type: String,
    default: 'staff'
  },
  clearanceLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  active: {
    type: Boolean,
    default: true
  },
  hourLogEmail: {
    type: String,
    default: 'none'
  },
  memo: {
    type: String
  }
});

// Rather than storing all the data, we can generate it on the fly
userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

// Compound index as text
userSchema.index({
  email: 'text',
  firstName: 'text',
  lastName: 'text'
});

// Serialize and deserialize sessions
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// PrettyPrint MongoDB errors if they're thrown by the server
userSchema.plugin(mongooseErrorHanlder);

// Depricated Mongo function required by Passport
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);