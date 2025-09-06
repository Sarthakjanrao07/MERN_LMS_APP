import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import banner from "../../../public/banner-img.png";
import { courseCategories } from "@/config";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";

function LandingPage() {
  const navigate = useNavigate();
  const [publicCourses, setPublicCourses] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://mern-lms-app-backend.onrender.com/student/public-course/public/landing"
        );
        setPublicCourses(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch public courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Initialize theme from storage or system preference
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
      setIsDarkMode(shouldUseDark);
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", shouldUseDark);
      }
    } catch (_) {
      // no-op
    }
  }, []);

  // Persist theme and toggle html class
  useEffect(() => {
    try {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", isDarkMode);
      }
    } catch (_) {
      // no-op
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleNavigateToCoursesPage = (categoryId) => {
    sessionStorage.removeItem("filters");
    sessionStorage.setItem("filters", JSON.stringify({ category: [categoryId] }));
    navigate("/courses");
  };

  const handleCourseNavigate = (courseId) => {
    navigate(`/course/details/${courseId}`);
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 to-gray-950 text-gray-100"
          : "bg-gradient-to-br from-slate-50 to-white text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav className={`${
        isDarkMode ? "bg-gray-900/40 border-white/10" : "bg-white/60 border-black/10"
      } backdrop-blur-xl border-b shadow-lg`}>
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
                onClick={handleToggleTheme}
                className={`${
                  isDarkMode
                    ? "bg-white/10 hover:bg-white/20 text-gray-100 border border-white/10"
                    : "bg-white/60 hover:bg-white/70 text-gray-800 border border-black/10"
                } px-3 py-2 rounded-md backdrop-blur-xl transition-colors`}
                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </Button>
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
      <section className="w-full py-12 px-6 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
            Master{" "}
            <span className="text-blue-600">
              <Typewriter
                words={["Web Development", "DSA", "Interview Skills", "React & Node.js"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of learners. Learn from industry experts and build skills that matter.
          </p>
          <Button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-md shadow-md"
          >
            Sign In to Get Started
          </Button>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className={`${
            isDarkMode ? "bg-white/5 border-white/10" : "bg-white/60 border-black/10"
          } rounded-2xl p-2 backdrop-blur-xl shadow-2xl border`}>
            <img
              src={banner}
              alt="Learning Banner"
              className="max-w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-12 px-6">
        <div className={`${
          isDarkMode ? "bg-white/5 border-white/10" : "bg-white/60 border-black/10"
        } max-w-6xl mx-auto rounded-2xl backdrop-blur-xl shadow-2xl border p-6`}>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {courseCategories.map((categoryItem) => (
            <Button
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              className="bg-white/70 shadow hover:shadow-md rounded-lg px-4 py-3 text-left text-gray-700 font-medium border border-black/10 hover:border-blue-500 backdrop-blur-xl"
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
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
                className="bg-white/70 border border-black/10 rounded-xl overflow-hidden shadow-2xl cursor-pointer backdrop-blur-xl transition-transform hover:scale-[1.01]"
              >
                <img
                  src={courseItem.image || "https://via.placeholder.com/300x200"}
                  alt={courseItem.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{courseItem.instructorName}</p>
                  <p className="font-bold text-[16px]">
                    {courseItem.pricing === 0 ? "Free" : `$${courseItem.pricing}`}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No Courses Found</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-8">
        <div className={`${
          isDarkMode ? "bg-white/5 border-white/10" : "bg-white/60 border-black/10"
        } max-w-6xl mx-auto px-4 text-center rounded-2xl backdrop-blur-xl border shadow-2xl p-6`}>
          <p className="text-gray-200">© 2025 LMS App. All rights reserved.</p>
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
