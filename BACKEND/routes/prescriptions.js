const express = require("express")
const router = express.Router();
let Prescription = require("../models/Prescription");
const mongoose = require('mongoose');


//add details to the database
//http://localhost:8070/prescription/add
router.route("/add").post((req,res)=>{
    
    //get values from frontend
    const patientName = req.body.patientName;
    const patientPhone = Number(req.body.patientPhone);
    const patientAddress = req.body.patientAddress;
    const patientEmail = req.body.patientEmail;
    const doctorName = req.body.doctorName;
    const issueDate = Date.parse(req.body.issueDate);
    const prescription = req.body.prescription;
    
    const newprescription = new Prescription({
 
        patientName,
        patientPhone,
        patientAddress,
        patientEmail,
        doctorName,
        issueDate,
        prescription,       
    })

    console.log("add data:", newprescription);

    newprescription.save().then(()=>{
        //execute body
        //jason responce 
        res.json("Prescription Added")  //send a mg to the frontend (Prescription added)
    }).catch((err)=>{
        console.log(err.message);
    
    })

})

//get details from the database 
router.route("/").get((req,res)=>{

    //get all prescription details from find()
    Prescription.find().then((prescriptions)=>{
        res.json(prescriptions)
    }).catch((err)=>{
        console.log(err)
    })

})

// Update prescription details
router.put('/update/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { patientName, patientPhone, patientAddress, patientEmail, doctorName, issueDate, prescription } = req.body;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid Prescription ID' });
      }
  
      const updatedPrescription = await Prescription.findByIdAndUpdate(
        id,
        {
          patientName,
          patientPhone,
          patientAddress,
          patientEmail,
          doctorName,
          issueDate,
          prescription,
        },
        { new: true }
      );
  
      if (!updatedPrescription) {
        return res.status(404).json({ message: 'Prescription not found' });
      }
  
      res.json(updatedPrescription);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
});

//Delete lab report
router.delete("/delete/:id", async (req, res) =>{
    
    try{
    let id = req.params.id;

    await Prescription.findByIdAndDelete(id);
        res.status(200).json({status: "Prescription deleted"});
    }catch(err) {
        console.log(err.message);
        res.status(500).json({status: "Error with delete lab report", error: err.message});
    }
})

//Get only one prescription details 
router.route("/get/:id").get(async (req, res) => {
    let id = req.params.id;
    const prescription = await Prescription.findById(id).then((prescription)=> {
        res.status(200).json({status: "Prescription fetched", prescription})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).json({status: "Error with get lab report", error: err.message});
    })
})


module.exports = router;