const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');



router.post('/add', async (req, res) => {
    try {
        const { appointmentNumber, amount, paymentType, date } = req.body;

        const invoiceNumber = Math.floor(100000 + Math.random() * 900000);
        const newPayment = new Payment({ appointmentNumber, amount, paymentType, date, invoiceNumber });
        await newPayment.save();
        res.json({ status: 'Payment added', invoiceNumber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const paymentId = req.params.id;
        const { appointmentNumber, amount, paymentType, date } = req.body;

        const updatePayment = { appointmentNumber, amount, paymentType, date };
        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updatePayment, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json({ status: 'Payment Updated', payment: updatedPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const paymentId = req.params.id;
        const deletedPayment = await Payment.findByIdAndRemove(paymentId);
        if (!deletedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json({ status: 'Payment Deleted', payment: deletedPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/getbyappointment/:appointmentNumber', async (req, res) => {
    const appointmentNumber = req.params.appointmentNumber;

    if (!appointmentNumber || isNaN(appointmentNumber)) {
        return res.status(400).json({ error: 'Invalid appointment number' });
    }

    try {
        const payment = await Payment.findOne({ appointmentNumber: appointmentNumber });
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/get/:id', async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
