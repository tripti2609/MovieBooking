const express = require('express');
const router = express.Router();
const Artist = require('../models/artist.model'); // Ensure this file exists

// GET all artists
router.get('/', async (req, res) => {  // <-- Correctly define the endpoint
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        console.error("Error fetching artists:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
