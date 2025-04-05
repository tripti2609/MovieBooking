const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Destructure the controller functions once
const { signUp, login, logout, getCouponCode, bookShow } = userController;

// Debugging log (optional, remove in production)
console.log("User Controller:", userController);
console.log("getCouponCode:", getCouponCode);
console.log("bookShow:", bookShow);
console.log("signUp:", signUp);
console.log("login:", login);

// User Authentication Routes
router.post('/auth/signup', signUp);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

// Coupon and Booking Routes
router.get('/getCouponCode', getCouponCode);
router.post('/bookShow', bookShow);

module.exports = router;
