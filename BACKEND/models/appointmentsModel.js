const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,

      required: true,
    },
    mobileNumber: {
      type: String,

      required: true,
    },
    nic: {
      type: String,

      required: true,
    },
    email: {
      type: String,

      required: true,
    },

    appointmentDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    appointmentTimeSlot: {
      type: String,
      default: "",
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },

    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("appointments", appointmentSchema);
