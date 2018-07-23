const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  position: {
    type: String,
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
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
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
},
  {
    timestamps: true
  }
);

// Compound index as text
contactSchema.index({
  email: 1,
  firstName: 1,
  lastName: 1
});

module.exports = mongoose.model('Contact', contactSchema);