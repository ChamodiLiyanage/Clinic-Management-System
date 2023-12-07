const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    }, 
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;
