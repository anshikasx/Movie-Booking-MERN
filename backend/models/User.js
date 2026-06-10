const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true },
  password:   { type: String, required: true },
  contact:    { type: String, default: '' },
  city:       { type: String, default: '' },
  state:      { type: String, default: '' },
  birthday:   { type: String, default: '' },
  anniversary:{ type: String, default: '' },
  genres:     { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);