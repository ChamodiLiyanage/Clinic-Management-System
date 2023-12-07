const express = require('express');
const router = express.Router();
const multer = require('multer');
const Drug = require('../models/Drug'); // Import the Drug model

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Specify the file name for the uploaded file
  }
});

const upload = multer({ storage: storage });

// Upload a file and add a new Drug
router.post('/add', upload.single('file'), async (req, res) => {
  try {
    const { medicineName, genericName, expirationDate, dosageForm, manufacturer, storageConditions, price, quantity } = req.body;

    const newDrug = new Drug({
      medicineName,
      genericName,
      expirationDate,
      dosageForm,
      manufacturer,
      storageConditions,
      price,
      quantity,
      file: req.file.path // Save the file path in the database
    });

    await newDrug.save();

    res.json('Drug added');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all drugs
router.get('/', async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.json(drugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a drug by ID
router.get('/get/:id', async (req, res) => {
  try {
    const drugId = req.params.id;
    const drug = await Drug.findById(drugId);
    if (!drug) {
      return res.status(404).json({ error: 'Drug not found' });
    }
    res.json(drug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a drug by ID
router.put('/update/:id', async (req, res) => {
  try {
    const drugId = req.params.id;
    const { medicineName, genericName, expirationDate, dosageForm, manufacturer, storageConditions, price, quantity, file } = req.body || {};

    if (!req.body) {
      console.error('Request body is empty or undefined');
      return res.status(400).json({ error: 'Invalid request body' });
    }

    console.log('Request Body Data:', {
      medicineName,
      genericName,
      expirationDate,
      dosageForm,
      manufacturer,
      storageConditions,
      price,
      quantity,
      file
    });

    const updatedDrug = await Drug.findByIdAndUpdate(
      drugId,
      {
        medicineName,
        genericName,
        expirationDate,
        dosageForm,
        manufacturer,
        storageConditions,
        price,
        quantity,
        file
      },
      { new: true }
    );

    if (!updatedDrug) {
      return res.status(404).json({ error: 'Drug not found' });
    }

    res.json({ message: 'Drug updated', drug: updatedDrug });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Delete a drug by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const drugId = req.params.id;
    const deletedDrug = await Drug.findByIdAndRemove(drugId);
    if (!deletedDrug) {
      return res.status(404).json({ error: 'Drug not found' });
    }
    res.json({ message: 'Drug deleted', drug: deletedDrug });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
