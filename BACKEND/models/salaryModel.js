const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    basic_sal: {
      type: String,
      required: true,
    },
    over_time : {
        type: String,
        required: true,
    },
    tot_sal : {
        type: String,
        required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("salary", salarySchema);