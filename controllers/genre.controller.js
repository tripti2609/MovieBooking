const express = require('express');
const Genre = require('../models/genre.model'); // Assuming you have a Genre model

// Get all genres
const findAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: "Error fetching genres", error: error.message });
    }
};

module.exports = { findAllGenres };
