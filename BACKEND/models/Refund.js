const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefundSchema = new Schema({
    refundId: {
        type: Number,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        enum: ['Cash', 'Debit Card', 'Credit Card'],
        required: true,
    },
    requestedDate: {
        type: Date,
        required: true,
    },
    invoiceId: {
        type: Number,
        required: true,
        unique: true,
    },
});

const Refund = mongoose.model('Refund', RefundSchema);
module.exports = Refund;
