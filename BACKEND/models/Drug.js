const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  medicineName: {
    type: String,
    required: true
  },
  genericName: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  dosageForm: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  storageConditions: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  file: {
    type: String,
    required: true
  }
});

const Drug = mongoose.model("Drug", drugSchema);
module.exports = Drug;
