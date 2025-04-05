const express = require('express');
const mongoose = require('mongoose'); // Import mongoose to check ObjectId
const router = express.Router();
const Movie = require('../models/movie.model'); // Ensure this file exists

// GET movie by ID
router.get('/:id', async (req, res) => {
    try {
        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Movie ID" });
        }

        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json(movie);
    } catch (err) {
        console.error("Error fetching movie:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
