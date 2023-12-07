const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PatientregSchema = new Schema({

    PatientName: {
        type : String,
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

const Patientreg = mongoose.model("Patientreg", PatientregSchema);
module.exports = Patientreg;

