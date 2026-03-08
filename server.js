const express = require("express");
const mongoose = require("mongoose");

const policyRoutes = require("./routes/policyRoutes");
const logger = require("./middleware/logger");

console.log("Server.js started");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/policies", policyRoutes);

// Route not found (404) catch-all
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

mongoose.connect("mongodb://127.0.0.1:27017/insuranceDB")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});