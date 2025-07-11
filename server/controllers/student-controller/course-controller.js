const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentViewCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    console.log(req.query, "req.query");

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;

        break;
      case "price-hightolow":
        sortParam.pricing = -1;

        break;
      case "title-atoz":
        sortParam.title = 1;

        break;
      case "title-ztoa":
        sortParam.title = -1;

        break;

      default:
        sortParam.pricing = 1;
        break;
    }

    const coursesList = await Course.find(filters).sort(sortParam);

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getStudentViewCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const { id, studentId } = req.params;

    const studentCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    let ifStudentAlreadyBoughtCurrentCourse = false;

    if (studentCourses && studentCourses.courses) {
      ifStudentAlreadyBoughtCurrentCourse =
        studentCourses.courses.findIndex((item) => item.courseId === id) > -1;
    }

    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    });
  } catch (e) {
    console.error("checkCoursePurchaseInfo Error:", e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
      error: e.message, // helpful for debugging
    });
  }
};

const getAllPublicCoursesForLanding = async (req, res) => {
  try {
    const courses = await Course.find({ visibility: "public" })
      .sort({ createdAt: -1 }) // or any custom logic
      .limit(10); // only latest 10 public courses

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Error fetching public courses:", error);
    res.status(500).json({ success: false, message: "Failed to fetch public courses" });
  }
};



// const checkCoursePurchaseInfo = async (req, res) => {
//   try {
//     const { id, studentId } = req.params;
//     const studentCourses = await StudentCourses.findOne({
//       userId: studentId,
//     });

//     const ifStudentAlreadyBoughtCurrentCourse =
//       studentCourses.courses.findIndex((item) => item.courseId === id) > -1;
//     res.status(200).json({
//       success: true,
//       data: ifStudentAlreadyBoughtCurrentCourse,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

module.exports = {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
  getAllPublicCoursesForLanding, // ✅ must be included
};