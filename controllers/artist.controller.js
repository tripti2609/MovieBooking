const express = require('express');
const Artist = require('../models/artist.model'); // Assuming you have an Artist model

// Get all artists
const findAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: "Error fetching artists", error: error.message });
    }
};

module.exports = { findAllArtists };
