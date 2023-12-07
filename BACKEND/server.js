const express = require("express");
require("dotenv/config");
const cors = require("cors");
const { supplierRouter } = require('./routes/supplier.js');
require("./config/dbConfig.js");
const { notFound } = require("./middlewares/not-found.js");
const { errorHandlerMiddleware } = require("./middlewares/error-handler.js");

const app = express();
app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

// API Routes
app.use('/api/supplier', supplierRouter);

const usersRoute = require("./routes/usersRoute");
const appointmentsRoute = require("./routes/appointmentsRoute");
const paymentRouter = require("./routes/payment");
const refundRouter = require("./routes/refund");

const patientRouter = require("./routes/patients.js");

app.use("/Patient", patientRouter);


app.use('/uploads', express.static('uploads'));

const drugRouter = require("./routes/drug.js");
 app.use("/drug", drugRouter);

 const prescriptionRouter = require("./routes/prescriptions.js");
 app.use("/prescription", prescriptionRouter);

const testRouter = require("./routes/test.js");
app.use("/Test", testRouter);

const inventoryRouter = require("./routes/inventory.js");
app.use("/inventory", inventoryRouter);


const memberRoute = require("./routes/membersRoute");
app.use("/api/member", memberRoute);

const salaryRoute = require("./routes/salaryRoute");
app.use("/api/salary", salaryRoute);

app.use("/api/users", usersRoute);
app.use("/api/appointments", appointmentsRoute);
app.use("/payment", paymentRouter);
app.use("/refund", refundRouter);


const patientregRouter = require("./routes/patientsreg.js");
app.use("/patientreg", patientregRouter);


const urinalysisRouter = require('./routes/urinalysis.js');
app.use('/Urinalysis', urinalysisRouter);
// Error Handlers
app.use(notFound);
app.use((err, req, res, next) => {
  console.error(err);
  errorHandlerMiddleware(err, req, res, next);
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server started at ${port}`));
