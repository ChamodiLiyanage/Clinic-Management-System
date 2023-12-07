const Patient = require("../models/labreg");
const router = require("express").Router();
const { body, validationResult } = require('express-validator');

// Create a patient

http://Localhost:8070/patient/register


router.route("/register").post([

  body("PatientCode").notEmpty().isString(),
  body("PatientName").notEmpty().isString(),
  body("PatientDateOfBirth").notEmpty().isString(),
  body("Patientage").notEmpty().isNumeric(),
  body("PatientphoneNumber").isNumeric().isLength({ min: 10, max: 10 }),
  body("Patientgender").notEmpty().isString(),
  body("Patientemail").isEmail(),

], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const newPatient = new Patient({
    PatientCode: req.body.PatientCode,
    PatientName: req.body.PatientName,
    PatientDateOfBirth: req.body.PatientDateOfBirth,
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

// search patient 

http://Localhost:8070/patient

router.route("/").get(async (req, res) => {
  const { PatientphoneNumber } = req.query;
 
  try {
    console.log("Patient Contact Number:", PatientphoneNumber);

    const patient = await Patient.findOne({ PatientphoneNumber: PatientphoneNumber });

    if (patient) {
      // Patient with this phone number exists
      console.log("Patient Found:", patient);
      res.status(200).json({ exists: true, patient });
    } else {
      // Patient with this phone number does not exist
      console.log("Patient Not Found");
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error searching by phone number" });
  }
});



module.exports = router;
