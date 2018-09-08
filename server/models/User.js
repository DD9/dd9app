const mongoose = require('mongoose');

const { Schema } = mongoose;
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseErrorHanlder = require('mongoose-mongodb-errors');

const userSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true,
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    default: mongoose.Types.ObjectId('110000000000000000000000'),
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address',
  },
  signInCount: {
    type: Number,
  },
  lastLogin: {
    type: Date,
  },
  lastLoginIP: {
    type: String,
  },
  firstName: {
    type: String,
    required: 'Please supply a first name',
    trim: true,
  },
  lastName: {
    type: String,
    required: 'Please supply a last name',
    trim: true,
  },
  role: {
    type: String,
    default: 'staff',
  },
  permissions: {
    type: Array,
    default: [{
      admin: false,
    }],
  },
  status: {
    type: String,
    default: 'active',
  },
},
{
  timestamps: true,
});

// Compound index as text
userSchema.index({
  email: 1,
  firstName: 1,
  lastName: 1,
});

// Serialize and deserialize sessions
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// PrettyPrint MongoDB errors if they're thrown by the server
userSchema.plugin(mongooseErrorHanlder);

module.exports = mongoose.model('User', userSchema);