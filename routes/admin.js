const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware"); // ✅ Correct
const Job = require("../models/Job");
const Application = require("../models/Application");

const router = express.Router();

router.get("/dashboard", authMiddleware, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admins only" });

    try {
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();

        const recentApplications = await Application.find()
            .sort({ appliedAt: -1 })
            .limit(5)
            .populate("jobId studentId");

        const jobWiseCount = await Application.aggregate([
            { $group: { _id: "$jobId", count: { $sum: 1 } } }
        ]);

        const jobs = await Job.find(); // for job title mapping
        const jobMap = {};
        jobs.forEach((job) => {
            jobMap[job._id.toString()] = job.title;
        });

        const jobStats = jobWiseCount.map((entry) => ({
            jobTitle: jobMap[entry._id.toString()] || "Unknown Job",
            applications: entry.count
        }));

        res.json({
            totalJobs,
            totalApplications,
            recentApplications,
            jobStats
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put("/application/:id/status", authMiddleware, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admins only" });

    const { status } = req.body;
    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: "Application not found" });

    app.status = status;
    await app.save();

    res.json({ message: "Status updated", status });
});

module.exports = router;
