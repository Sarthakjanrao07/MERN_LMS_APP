const express = require("express");
const {
  getStudentViewCourseDetails,
  getAllStudentViewCourses,
  checkCoursePurchaseInfo,
  getAllPublicCoursesForLanding,
} = require("../../controllers/student-controller/course-controller");

const router = express.Router();

// Get all courses with optional filters (for catalog or explore page)
router.get("/get", getAllStudentViewCourses);

// Get single course details
router.get("/get/details/:id", getStudentViewCourseDetails); 

// Check if a student has purchased a course
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);

// ✅ Public courses for landing page (featured section)
router.get("/public/landing", getAllPublicCoursesForLanding);

module.exports = router;
