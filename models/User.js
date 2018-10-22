const mongoose = require('mongoose');

const { Schema } = mongoose;
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true,
  },
  googleId: {
    type: String,
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
  name: {
    first: {
      type: String,
      required: 'Please supply a first name',
      trim: true,
    },
    last: {
      type: String,
      required: 'Please supply a last name',
      trim: true,
    },
  },
  role: {
    type: String,
    default: 'contractor',
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
  hourlyRate: {
    type: Array,
    default: [{
      USD: 60.00,
    }],
  }
},
{
  timestamps: true,
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.virtual('name.full').get(function () {
  return `${this.name.first} ${this.name.last}`;
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
userSchema.plugin(mongooseErrorHandler);

module.exports = mongoose.model('User', userSchema);
