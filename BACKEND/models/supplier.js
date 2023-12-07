const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  contactDetails: {
    type: String,
    required: true,
  },
  // Add other fields as necessary
});

const Supplier = mongoose.model("Supplier", SupplierSchema);
module.exports = Supplier;
