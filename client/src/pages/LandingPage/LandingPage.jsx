import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import banner from "../../../public/banner-img.png";
import { courseCategories } from "@/config";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
import { Sun, Moon, Sparkles } from "lucide-react";

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

  const handleNavigateToCoursesPage = (categoryId) => {
    sessionStorage.removeItem("filters");
    sessionStorage.setItem("filters", JSON.stringify({ category: [categoryId] }));
    navigate("/courses");
  };

  const handleCourseNavigate = (courseId) => {
    navigate(`/course/details/${courseId}`);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Navbar */}
      <nav className={`backdrop-blur-md bg-opacity-20 border-b border-opacity-20 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      } shadow-lg`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-purple-400' : 'text-blue-600'
              } flex items-center gap-2`}>
                <Sparkles className="w-6 h-6" />
                LMS App
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/courses" className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-blue-600'
              }`}>Courses</Link>
              <Link to="/about" className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-blue-600'
              }`}>About</Link>
              <Link to="/contact" className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-blue-600'
              }`}>Contact</Link>
              
              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-2">
                <Sun className={`w-4 h-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-yellow-400' : 'text-gray-600'
                }`} />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                  className="data-[state=checked]:bg-purple-600"
                />
                <Moon className={`w-4 h-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400' : 'text-gray-400'
                }`} />
              </div>
              
              <Button
                onClick={() => navigate("/auth")}
                className={`transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } px-4 py-2 backdrop-blur-sm`}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full py-16 px-6 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
        {/* Background Glass Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-30 ${
            isDarkMode ? 'bg-purple-500' : 'bg-blue-400'
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-30 ${
            isDarkMode ? 'bg-violet-500' : 'bg-indigo-400'
          }`}></div>
        </div>
        
        <div className="lg:w-1/2 mb-10 lg:mb-0 relative z-10">
          <div className={`backdrop-blur-md bg-opacity-10 rounded-3xl p-8 border border-opacity-20 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } shadow-2xl`}>
            <h1 className={`text-5xl font-extrabold leading-tight mb-6 transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Master{" "}
              <span className={`transition-colors duration-500 ${
                isDarkMode ? 'text-purple-400' : 'text-blue-600'
              }`}>
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
            <p className={`text-lg mb-6 transition-colors duration-500 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of learners. Learn from industry experts and build skills that matter.
            </p>
            <Button
              onClick={() => navigate("/auth")}
              className={`transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } px-8 py-4 text-lg rounded-xl shadow-lg backdrop-blur-sm hover:scale-105 transform`}
            >
              Sign In to Get Started
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center relative z-10">
          <div className={`backdrop-blur-md bg-opacity-10 rounded-3xl p-4 border border-opacity-20 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } shadow-2xl`}>
            <img
              src={banner}
              alt="Learning Banner"
              className="max-w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-semibold mb-12 text-center transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {courseCategories.map((categoryItem) => (
              <Button
                key={categoryItem.id}
                onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
                className={`backdrop-blur-md bg-opacity-20 border border-opacity-20 rounded-xl px-6 py-4 text-left font-medium transition-all duration-300 hover:scale-105 transform ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-500' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-500'
                } shadow-lg hover:shadow-xl`}
              >
                {categoryItem.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {publicCourses.length > 0 ? (
              publicCourses.map((courseItem) => (
                <div
                  key={courseItem._id}
                  onClick={() => handleCourseNavigate(courseItem._id)}
                  className={`backdrop-blur-md bg-opacity-20 border border-opacity-20 rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 transform hover:shadow-2xl ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={courseItem.image || "https://via.placeholder.com/300x200"}
                      alt={courseItem.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className={`font-bold mb-3 text-lg transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {courseItem.title}
                    </h3>
                    <p className={`text-sm mb-4 transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {courseItem.instructorName}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className={`font-bold text-lg transition-colors duration-500 ${
                        isDarkMode ? 'text-purple-400' : 'text-blue-600'
                      }`}>
                        {courseItem.pricing === 0 ? "Free" : `$${courseItem.pricing}`}
                      </p>
                      <div className={`w-2 h-2 rounded-full ${
                        isDarkMode ? 'bg-purple-400' : 'bg-blue-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                <p className={`text-lg transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No Courses Found
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`backdrop-blur-md bg-opacity-20 border-t border-opacity-20 py-12 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-gray-800 border-gray-600'
      }`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className={`backdrop-blur-md bg-opacity-10 rounded-2xl p-8 border border-opacity-20 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-gray-700 border-gray-600'
          }`}>
            <p className={`text-lg mb-6 transition-colors duration-500 ${
              isDarkMode ? 'text-gray-300' : 'text-white'
            }`}>
              © 2025 LMS App. All rights reserved.
            </p>
            <div className="flex justify-center space-x-8">
              <a 
                href="https://twitter.com" 
                className={`transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                Twitter
              </a>
              <a 
                href="https://linkedin.com" 
                className={`transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com" 
                className={`transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
