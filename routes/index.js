const express = require('express');
const router = express.Router();

// Example Route
router.get('/movies', (req, res) => {
    res.json({ message: "Movie List" });
});

module.exports = router;
