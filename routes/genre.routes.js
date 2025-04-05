const express = require('express');
const router = express.Router();
const Genre = require('../models/genre.model'); // Ensure this model file exists

// GET all genres
router.get('/', async (req, res) => {  // <-- Correctly define the endpoint
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        console.error("Error fetching genres:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
