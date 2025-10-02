import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import banner from "../../../public/banner-img.png";
import { courseCategories } from "@/config";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();
  const [publicCourses, setPublicCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Set a timeout to ensure the loading screen appears for a minimum time
    const loadingTimer = setTimeout(() => {
      setIsLoading(true);
    }, 100);

    // Fetch courses data
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/student/public-course/public/landing",
          { timeout: 5000 }
        );
        setPublicCourses(response.data.data || []);
        setApiError(null);
      } catch (error) {
        console.error("Failed to fetch public courses:", error);
        
        if (error.code === 'ECONNABORTED') {
          setApiError("Request timed out. Please try again later.");
        } else if (error.response) {
          setApiError(`Server error: ${error.response.status}`);
        } else if (error.request) {
          setApiError("Unable to connect to the server. Please ensure the backend is running.");
        } else {
          setApiError("An unexpected error occurred.");
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log("Using mock data for development");
          setPublicCourses([
            {
              _id: "mock1",
              title: "Introduction to Web Development",
              instructorName: "John Doe",
              pricing: 0,
              image: "https://via.placeholder.com/300x200"
            },
            {
              _id: "mock2",
              title: "Advanced React Patterns",
              instructorName: "Jane Smith",
              pricing: 49.99,
              image: "https://via.placeholder.com/300x200"
            }
          ]);
        }
      } finally {
        // Clear the loading timer and set page as ready
        clearTimeout(loadingTimer);
        setIsPageReady(true);
        
        // Ensure minimum loading time of 2 seconds for better UX
        setTimeout(() => {
          setIsLoading(false);
          clearInterval(progressInterval);
          setLoadingProgress(100);
        }, 2000);
      }
    };
    
    fetchCourses();

    // Cleanup function
    return () => {
      clearTimeout(loadingTimer);
      clearInterval(progressInterval);
    };
  }, []);

  const handleNavigateToCoursesPage = (categoryId) => {
    sessionStorage.removeItem("filters");
    sessionStorage.setItem("filters", JSON.stringify({ category: [categoryId] }));
    navigate("/courses");
  };

  const handleCourseNavigate = (courseId) => {
    navigate(`/course/details/${courseId}`);
  };

  // Enhanced loading screen component with progress bar
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 mb-6"></div>
        <p className="text-xl font-medium text-gray-700 mb-2">Loading amazing courses...</p>
        <p className="text-sm text-gray-500 mb-6">Please wait while we prepare the best content for you</p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">{loadingProgress}%</p>
        
        {/* Loading tips */}
        <div className="mt-8 text-center text-gray-600 max-w-md">
          <p className="mb-2 font-medium">💡 Did you know?</p>
          <p className="text-sm">Our platform offers over 100 courses in web development, data science, and more!</p>
        </div>
      </div>
    );
  }

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

      {/* API Error Notification */}
      {apiError && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {apiError} {process.env.NODE_ENV === 'development' && "(Using mock data)"}
              </p>
            </div>
          </div>
        </div>
      )}

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
            loading="eager"
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
                className="border rounded-lg overflow-hidden shadow cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={courseItem.image || "https://via.placeholder.com/300x200"}
                  alt={courseItem.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2 truncate">{courseItem.title}</h3>
                  <p className="text-sm text-gray-700 mb-2 truncate">{courseItem.instructorName}</p>
                  <p className="font-bold text-[16px]">
                    {courseItem.pricing === 0 ? "Free" : `$${courseItem.pricing}`}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                {apiError 
                  ? "Unable to load courses at the moment. Please check back later!" 
                  : "No courses available at the moment. Please check back later!"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2025 LMS App. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="https://twitter.com" className="hover:text-blue-400 transition-colors">Twitter</a>
            <a href="https://linkedin.com" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href="https://github.com" className="hover:text-blue-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;