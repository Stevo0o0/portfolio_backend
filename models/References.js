const mongoose = require('mongoose');

const ReferenceSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true }
});

module.exports = mongoose.model('Reference', ReferenceSchema);
