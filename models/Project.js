const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: 'Please supply a company name',
    maxlength: 100,
  },
  status: {
    type: String,
    default: 'active',
  },
},
{
  timestamps: true,
});

projectSchema.index(
  { name: 1 },
);

projectSchema.index(
  { active: 1 },
  { dateClosed: -1 },
);

module.exports = mongoose.model('Project', projectSchema);
