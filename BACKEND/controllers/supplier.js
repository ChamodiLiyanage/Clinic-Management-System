const Supplier = require("../models/supplier.js");

const getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({});
  res.status(200).json(suppliers);
};

const createSupplier = async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).json(supplier);
};

module.exports = {
  getAllSuppliers,
  createSupplier
};
