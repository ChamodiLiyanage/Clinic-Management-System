const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    appointmentNumber: {
        type: Number,
        required: true,
        ref:'appointments'
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
    date: {
        type: Date,
        required: true,
    },
    invoiceNumber: {
        type: Number,
        unique: true,
        required: true,
    }
});

PaymentSchema.pre('save', async function(next) {
    const Payment = this;
    if (!Payment.invoiceNumber) {
        let maxInvoiceNumber = await Payment.constructor.findOne().sort('-invoiceNumber');
        Payment.invoiceNumber = (maxInvoiceNumber && maxInvoiceNumber.invoiceNumber || 0) + 1;
    }
    next();
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
