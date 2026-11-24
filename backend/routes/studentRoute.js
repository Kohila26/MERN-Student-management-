
const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

// CREATE - Add student
router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json({
            message: "Student added successfully",
            student
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// GET STUDENTS + SEARCH + PAGINATION
router.get("/", async (req, res) => {
    try {
        // Get search value
        const search = req.query.search || "";

        // Get pagination values
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 5));

        // Calculate skipped records
        const skip = (page - 1) * limit;

        // Search query
        const query = {
            name: {
                $regex: search,
                $options: "i"
            }
        };

        // Get students
        const students = await Student.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // Count matching students
        const totalStudents = await Student.countDocuments(query);

        // Calculate total pages
        const totalPages = Math.ceil(totalStudents / limit);

        res.status(200).json({
            students,
            currentPage: page,
            totalPages,
            totalStudents,
            limit
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE - Update student
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Delete student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
