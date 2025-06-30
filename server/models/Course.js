// const mongoose = require("mongoose");

// const LectureSchema = new mongoose.Schema({
//   title: String,
//   videoUrl: String,
//   public_id: String,
//   freePreview: Boolean,
// });

// const CourseSchema = new mongoose.Schema({
//   instructorId: String,
//   instructorName: String,
//   date: Date,
//   title: String,
//   category: String,
//   level: String,
//   primaryLanguage: String,
//   subtitle: String,
//   description: String,
//   image: String,
//   welcomeMessage: String,
//   pricing: Number,
//   objectives: String,
//   students: [
//     {
//       studentId: String,
//       studentName: String,
//       studentEmail: String,
//       paidAmount: String,
//     },
//   ],
//   curriculum: [LectureSchema],
//   isPublised: Boolean,
// });

// //landing page cha ahe he chatgpt
// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   instructorName: { type: String, required: true },
//   image: { type: String },
//   curriculum: [{ type: String }],
//   level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
//   pricing: { type: Number, required: true },
// });

// module.exports = mongoose.model("Course", CourseSchema);


const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  public_id: String,
  freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
  instructorId: String,
  instructorName: String,
  date: Date,
  title: { type: String, required: true },
  category: String,
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  primaryLanguage: String,
  subtitle: String,
  description: String,
  image: String,
  welcomeMessage: String,
  pricing: { type: Number, required: true },
  objectives: String,
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublised: Boolean,
  isPublic: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.Course || mongoose.model("Course", CourseSchema);
