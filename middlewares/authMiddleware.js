const jwt = require("jsonwebtoken");

// ✅ Middleware function to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.headers && req.headers.authorization;

    if (!token || token === "guest_token") {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token." });
    }
};

// ✅ Function to verify token manually (for guest-aware routes)
const verifyToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
};
// ✅ Export both
module.exports = {
    authMiddleware,
    verifyToken
};

