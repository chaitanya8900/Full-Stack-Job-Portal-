const express = require("express");
const multer = require("multer");
const path = require("path");
const Application = require("../models/Application");
const Job = require("../models/Job");
const { authMiddleware, verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// 🗂 Storage configuration
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // timestamp + extension
    }
});

const upload = multer({ storage });

// 📌 Apply to a job (student + guest)
router.post("/:jobId", upload.single("resume"), async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ error: "Job not found" });

        const isGuest = !req.headers.authorization || req.headers.authorization === "guest_token";

        if (!isGuest) {
            // Authenticated student path
            const decoded = verifyToken(req);
            if (!decoded || decoded.role !== "student") {
                return res.status(403).json({ error: "Only students can apply" });
            }

            const existing = await Application.findOne({
                jobId: job._id,
                studentId: decoded.id
            });
            if (existing) return res.status(400).json({ error: "Already applied" });

            const application = new Application({
                jobId: job._id,
                studentId: decoded.id,
                resume: req.file?.path || null,
                appliedAt: new Date()
            });

            await application.save();
            return res.status(201).json({ message: "Application submitted successfully" });
        }

        // Guest user path
        const { guestName, guestEmail } = req.body;
        if (!guestName || !guestEmail) {
            return res.status(400).json({ error: "Guest name and email required" });
        }

        const application = new Application({
            jobId: job._id,
            guestName,
            guestEmail,
            appliedAt: new Date()
        });

        await application.save();
        return res.status(201).json({ message: "Guest application submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/my-applications", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ error: "Students only" });
        }

        const apps = await Application.find({ studentId: req.user.id })
            .populate("jobId");

        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
