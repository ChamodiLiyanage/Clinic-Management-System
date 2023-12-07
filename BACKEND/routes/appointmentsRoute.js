const router = require("express").Router();
const Appointment = require("../models/appointmentsModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add a appointment
router.post("/add-appointment", authMiddleware, async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    return res.send({
      success: true,
      message: "Appointment added successfully",
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// update an appointment
router.put("/update-appointment/:id", authMiddleware, async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, req.body);
    return res.send({
      success: true,
      message: "Appointment updated successfully",
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// delete an appointment
router.delete("/delete-appointment/:id", authMiddleware, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    return res.send({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// get all appointments
router.get("/get-all-appointments", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    return res.send({ success: true, data: appointments });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});
// get a appointment by id
router.get("/get-appointment-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    return res.send({ success: true, data: appointment });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

//get appointments by doctor name
router.get("/get-appointment-by-doc", authMiddleware, async (req, res) => {
  try {
    const docName = req.query.doctorName;
    const appointments = await Appointment.aggregate([
      {
        $match: {
          doctorName: docName,
        },
      },
    ]).exec();

    return res.send({ success: true, data: appointments });
  } catch (error) {
    console.log(error);
    return res.send({ sucess: false, message: error.message });
  }
});

router.get("/get-appointment-by-patient", authMiddleware, async (req, res) => {
  try {
    const cusName = req.query.cusName;
    const appointments = await Appointment.aggregate([
      {
        $match: {
          patientName: cusName,
        },
      },
    ]).exec();

    return res.send({ success: true, data: appointments });
  } catch (error) {
    console.log(error);
    return res.send({ sucess: false, message: error.message });
  }
});
// Route to check appointment availability
router.get("/check-availability", async (req, res) => {
  try {
    const { doctorName, appointmentTimeSlot } = req.query;

    // Check if there are any appointments for the same doctor and time slot
    const existingAppointment = await Appointment.findOne({
      doctorName,
      appointmentTimeSlot,
    });

    if (existingAppointment) {
      // Appointment slot is already booked
      return res.json({ available: false });
    } else {
      // Appointment slot is available
      return res.json({ available: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
