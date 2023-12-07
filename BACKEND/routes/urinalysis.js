const Test = require("../models/testlab");
const router = require("express").Router();
const { body, validationResult } = require('express-validator');

// Create a urinalysis test
router.route("/create-urine").post([

  body("PatientName").notEmpty().isString(),
  body("type").notEmpty().isString(),
  body("code").notEmpty().isString(),
  body("price").notEmpty().isNumeric(),
  
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const currentDate = new Date();

    const newTest = new Test({
      PatientName: req.body.PatientName,
      type: req.body.type,
      code: req.body.code,
      price: req.body.price,
      date: currentDate,
    });

    await newTest.save();
    res.status(200).json({ status: "Test Added!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error adding test", error: err.message });
  }
});

// Get all tests
router.route("/").get((req, res) => {
  Test.find()
    .then((tests) => {
      res.status(200).json(tests);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: "Error fetching tests", error: err.message });
    });
});

// Delete a test 
router.route("/:id").delete(async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndRemove(req.params.id);
    if (!deletedTest) {
      return res.status(404).json({ error: "Test not found" });
    }
    res.status(200).json({ status: "Test deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error deleting test", error: error.message });
  }
});

// Add a new route for searching by code
router.route("/search").get(async (req, res) => {
  const { code } = req.query;
  try {
    console.log("Searching for code:", code);
    const testRecords = await Test.find({ code: code });
    console.log("Search Results:", testRecords); // Add this line for debugging
    res.status(200).json(testRecords);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error searching by code" });
  }
});

module.exports = router;
