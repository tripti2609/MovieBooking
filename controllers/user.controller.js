const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const TokenGenerator = require('uuid-token-generator'); // npm install uuid-token-generator
const User = require('../models/user.model');
const Coupon = require('../models/Coupon');
const Booking = require('../models/Booking');

const tokgen = new TokenGenerator(256, TokenGenerator.BASE62); // strong token generator

// SIGNUP
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// LOGIN with UUID and token-generator
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate UUID and access-token
        const uuid = uuidv4();
        const accessToken = tokgen.generate();

        // Store in user model
        user.uuid = uuid;
        user.token = accessToken;
        await user.save();

        res.status(200).json({
            message: "Login successful",
            uuid,
            accessToken,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// LOGOUT
const logout = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            user.token = null;
            user.uuid = null;
            await user.save();
        }
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET COUPON
const getCouponCode = async (req, res) => {
    try {
        const { couponId } = req.query;
        if (!couponId) return res.status(400).json({ message: "Coupon ID required" });

        const coupon = await Coupon.findById(couponId);
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });

        res.status(200).json({ code: coupon.code, discount: coupon.discount });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// BOOK SHOW
const bookShow = async (req, res) => {
    try {
        const { userId, showId, seats, totalAmount, couponCode } = req.body;
        if (!userId || !showId || !seats?.length || !totalAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let discount = 0;
        if (couponCode) {
            const coupon = await Coupon.findOne({ code: couponCode });
            if (coupon) discount = coupon.discount;
        }

        const finalAmount = totalAmount - discount;
        const booking = new Booking({ userId, showId, seats, totalAmount: finalAmount, couponCode });

        await booking.save();
        res.status(201).json({ message: "Booking successful", bookingId: booking._id, finalAmount });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    signUp,
    login,
    logout,
    getCouponCode,
    bookShow
};
