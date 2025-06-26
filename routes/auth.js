const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body; // include role

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: role || "student" });

    await user.save();
    res.status(201).json({ message: "User registered" });
});



// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
});
router.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ name: user.name, email: user.email });
});


module.exports = router;
