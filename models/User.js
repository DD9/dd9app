const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Prevent false positives from mongoose promise library deprication
const md5 = require('md5');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseErrorHanlder = require('mongoose-mongodb-errors');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  admin: {
    type: Number,
    default: 5, //TODO RESET
    min: 0,
    max: 5
  },
});

// Rather than storing all the data, we can generate it on the fly
userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

// Serialize and deserialize sessions
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// PrettyPrint MongoDB errors if they're thrown by the server
userSchema.plugin(mongooseErrorHanlder);

// Depricated Mongo function required by Passport
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);