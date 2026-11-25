
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Student routes
const studentRoute = require("./routes/studentRoute");
app.use("/api/students", studentRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.log("MongoDB connection error:", error);
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
