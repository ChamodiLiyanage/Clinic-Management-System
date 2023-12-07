const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});

connection.on("error", (err) => {
  console.error("Mongo DB Connection Failed:", err);
});

module.exports = connection;