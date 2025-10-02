import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import banner from "../../../public/banner-img.png";
import { courseCategories } from "@/config";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();
  const [publicCourses, setPublicCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/student/public-course/public/landing"
        );
        setPublicCourses(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch public courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleNavigateToCoursesPage = (categoryId) => {
    sessionStorage.removeItem("filters");
    sessionStorage.setItem("filters", JSON.stringify({ category: [categoryId] }));
    navigate("/courses"); // navigate to student course explore page
  };

  const handleCourseNavigate = (courseId) => {
    navigate(`/course/details/${courseId}`); // direct to course details
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">LMS App</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              <Button
                onClick={() => navigate("/auth")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-purple-100 to-white py-12 px-6 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
            Master Skills That Matter
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of learners. Learn web development, DSA, interview prep, and more from industry experts.
          </p>
          <Button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-md shadow-md"
          >
            Sign In to Get Started
          </Button>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={banner}
            alt="Learning Banner"
            className="max-w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Course Categories */}
      <section className="bg-gray-50 py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {courseCategories.map((categoryItem) => (
            <Button
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              className="bg-white shadow hover:shadow-md rounded-lg px-4 py-3 text-left text-gray-700 font-medium border hover:border-blue-500"
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publicCourses.length > 0 ? (
            publicCourses.map((courseItem) => (
              <div
                key={courseItem._id}
                onClick={() => handleCourseNavigate(courseItem._id)}
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
              >
                <img
                  src={courseItem.image || "https://via.placeholder.com/300x200"}
                  alt={courseItem.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{courseItem.instructorName}</p>
                  <p className="font-bold text-[16px]">{courseItem.pricing === 0 ? "Free" : `$${courseItem.pricing}`}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No Courses Found</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2025 LMS App. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="https://twitter.com" className="hover:text-blue-400">Twitter</a>
            <a href="https://linkedin.com" className="hover:text-blue-400">LinkedIn</a>
            <a href="https://github.com" className="hover:text-blue-400">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
