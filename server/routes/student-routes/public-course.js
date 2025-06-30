const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");

router.get("/public/landing", async (req, res) => {
  try {
    const publicCourses = await Course.find({ isPublised: true }).select(
      "title instructorName image curriculum level pricing"
    );
    res.status(200).json({ success: true, data: publicCourses });
  } catch (error) {
    console.error("Error fetching public courses:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
