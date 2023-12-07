const express = require('express');
const router = express.Router();
const Refund = require('../models/Refund');

router.post('/add', async (req, res) => {
    try {
        const { amount, paymentType, requestedDate, invoiceId } = req.body;

        const refundId = Math.floor(100000 + Math.random() * 900000);
        const newRefund = new Refund({ refundId, amount, paymentType, requestedDate, invoiceId });

        await newRefund.save();
        res.json({ status: 'Refund added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const refunds = await Refund.find();
        res.json(refunds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const refundId = req.params.id;
        const updateRefund = req.body;

        const updatedRefund = await Refund.findOneAndUpdate({ refundId: refundId }, updateRefund, { new: true });
        if (!updatedRefund) {
            return res.status(404).json({ error: 'Refund not found' });
        }
        res.json({ status: 'Refund Updated', refund: updatedRefund });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const refundId = req.params.id;
        const deletedRefund = await Refund.findOneAndDelete(refundId);
        if (!deletedRefund) {
            return res.status(404).json({ error: 'Refund not found' });
        }
        res.json({ status: 'Refund Deleted', refund: deletedRefund });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const refundId = req.params.id;
        const refund = await Refund.findOne({ refundId: refundId });
        if (!refund) {
            return res.status(404).json({ error: 'Refund not found' });
        }
        res.json(refund);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;