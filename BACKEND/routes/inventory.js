const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Add an inventory item
router.post('/add', async (req, res) => {
    try {
        const { name, code, brand, category, quantity, unit, price, cost } = req.body;

        // Create a new inventory document
        const newInventoryItem = new Inventory({ name, code, brand, category, quantity, unit, price, cost });

        // Save the new inventory item to the database
        await newInventoryItem.save();
        res.json('Inventory item added');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const inventoryItems = await Inventory.find();
        res.json(inventoryItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update an inventory item by ID
router.put('/update/:id', async (req, res) => {
    try {
        const inventoryItemId = req.params.id;
        const { name, code, brand, category, quantity, unit, price, cost } = req.body;

        // Update the inventory item document
        const updatedInventoryItem = { name, code, brand, category, quantity, unit, price, cost };
        const updatedItem = await Inventory.findByIdAndUpdate(inventoryItemId, updatedInventoryItem, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }

        res.json({ status: 'Inventory item updated', item: updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete an inventory item by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const inventoryItemId = req.params.id;
        const deletedItem = await Inventory.findByIdAndRemove(inventoryItemId);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }

        res.json({ status: 'Inventory item deleted', item: deletedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get an inventory item by ID
router.get('/get/:id', async (req, res) => {
    try {
        const inventoryItemId = req.params.id;
        const inventoryItem = await Inventory.findById(inventoryItemId);

        if (!inventoryItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }

        res.json(inventoryItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
