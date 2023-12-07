const Patient = require("../models/lab");
const router = require("express").Router();
const { body, validationResult } = require('express-validator');

// Create a patient

http://Localhost:8070/patient/register


router.route("/register").post([

  body("PatientName").notEmpty().isString(),
  body("Patientage").notEmpty().isNumeric(),
  body("PatientphoneNumber").isNumeric(),
  body("Patientgender").notEmpty().isString(),
  body("Patientemail").isEmail(),

], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const newPatient = new Patient({
    PatientName: req.body.PatientName,
    Patientage: req.body.Patientage,
    PatientphoneNumber: req.body.PatientphoneNumber,
    Patientgender: req.body.Patientgender,
    Patientemail: req.body.Patientemail
  });

  await newPatient.save();
    res.status(200).json({ status: "Patient Added!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error adding patient", error: err.message });
  }
});

// Get all patients

http://Localhost:8070/patient

router.route("/").get((req, res) => {
  Patient.find()
    .then((patients) => {
      res.status(200).json(patients);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: "Error fetching patients", error: err.message });
    });
});


module.exports = router;
