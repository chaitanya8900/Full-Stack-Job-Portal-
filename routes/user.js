const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware"); // ✅ CORRECT
const User = require("../models/User");

router.put("/profile", authMiddleware, async (req, res) => {
    const { name, email } = req.body;

    const existing = await User.findOne({ email });
    if (existing && existing._id.toString() !== req.user.id) {
        return res.status(400).json({ error: "Email already in use" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name;
    user.email = email;
    await user.save();

    res.json({ message: "Profile updated", user });
});


module.exports = router;
