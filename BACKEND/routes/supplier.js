const express = require("express");
const {
  getAllSuppliers,
  createSupplier,
} = require("../controllers/supplier.js");

const supplierRouter = express.Router();

supplierRouter.route("/")
  .get(getAllSuppliers)
  .post(createSupplier);

module.exports = { supplierRouter };
