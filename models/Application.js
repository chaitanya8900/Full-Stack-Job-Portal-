const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resume: String,
    appliedAt: Date,
    guestName: { type: String },        // ✅ New field
    guestEmail: { type: String },       // ✅ New field
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Application", applicationSchema);
