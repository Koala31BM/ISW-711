const express = require('express');
const router = express.Router();
const Model = require('../models/model');


// 🔹 POST
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// 🔹 GET ALL
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// 🔹 GET BY ID
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// 🔹 UPDATE
router.patch('/update/:id', async (req, res) => {
    try {
        const result = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// 🔹 DELETE
router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Model.findByIdAndDelete(req.params.id);
        res.send(`Documento con nombre ${data.name} eliminado`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
