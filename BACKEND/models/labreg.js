const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PatientSchema = new Schema({

    PatientCode: {
        type : String,
        required: true

    },

    PatientName: {
        type : String,
        required: true

    },

    PatientDateOfBirth: {
        type : Date,
        required: true

    },
    
    Patientage: {
        type : Number,
        required: true

    },

    PatientphoneNumber: {
        type : Number,
        required: true

    },
    
    Patientemail: {
        type : String,
        required: true

    },

    Patientgender: {
        type : String,
        required: true

    },

})

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;

