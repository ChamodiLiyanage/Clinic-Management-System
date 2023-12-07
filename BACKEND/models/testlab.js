const mongoose = require('mongoose');

const Schemas = mongoose.Schema;

const TestSchema = new Schemas({

    PatientName: {
        type : String,
        required: true

    },

    type: {
        type : String,
        required: true

    },

    code: {
        type : Number,
        required: true
        

    },

    price: {
        type : Number,
        required: true

    },

    date: {
        type: Date, 
        default: Date.now() 
    },
    status: {
        type: String, 
        default: 'pending' 
    },

})

TestSchema.index({ code: 1 }, { unique: true });

const Test = mongoose.model("Test", TestSchema);
module.exports = Test;