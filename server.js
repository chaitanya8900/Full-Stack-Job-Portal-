const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve uploaded resumes

// Import Routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applyRoutes = require("./routes/apply");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/apply", applyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user", require("./routes/user"));

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch((err) => console.error(err));
