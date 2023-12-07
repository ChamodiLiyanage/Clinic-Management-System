const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    patientPhone: {
        type: Number,
        required: true,
    },
    patientAddress: {
        type: String,
    },
    patientEmail: {
        type: String,
        required: true,
    },
    // priscriptionNo: {
    //     type: Number,
    //     required: true,
    // },
    doctorName: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    prescription: {
      type: String,
      required: true,
  },
  },

);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
