const express = require("express");
const Job = require("../models/Job");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin-only: Post a job
router.post("/", authMiddleware, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { title, description, company, deadline } = req.body;

    const job = new Job({
        title,
        description,
        company,
        deadline,
        postedBy: req.user.id
    });

    await job.save();
    res.status(201).json({ message: "Job posted", job });
});

// Public: Get all jobs
router.get("/", async (req, res) => {
    const jobs = await Job.find().sort({ deadline: 1 });
    res.json(jobs);
});
router.put("/:id", authMiddleware, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admins only" });

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Job not found" });

    res.json({ message: "Job updated", job: updated });
});
router.delete("/:id", authMiddleware, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admins only" });

    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Job not found" });

    res.json({ message: "Job deleted" });
});


module.exports = router;
