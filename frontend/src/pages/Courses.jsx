import React, { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import BottomNav from "@/components/shared/BottomNav";
import { Clock, Users, Star, BookOpen } from "lucide-react";
import axios from "axios";
import { COURSE_API_END_POINT } from "@/utils/constant";


const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${COURSE_API_END_POINT}/get`,
          {
            withCredentials: true
          }
        );
        setCourses(res.data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-5 flex-1 w-full">
        <h1 className="text-2xl font-semibold text-gray-900">
          Explore Courses
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          Learn new skills from expert instructors
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-5 pb-24">
          {
            courses.map((course)=>(
              <div
                key={course._id}
                className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <div className="h-36 bg-gray-100 flex items-center justify-center">
                  <BookOpen 
                    size={38}
                    className="text-gray-400"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-indigo-600 font-medium">
                    {course.category}
                  </span>
                  <h2 className="mt-2 text-base font-semibold text-gray-900 line-clamp-2">
                    {course.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-600">
                      {
                        typeof course.instructor === "string"
                        ? course.instructor.charAt(0)
                        : course.instructor?.name?.charAt(0) || "I"
                      }
                    </div>

                    <span className="text-xs text-gray-500">
                      {
                        typeof course.instructor === "string"
                        ? course.instructor
                        : course.instructor?.name || "Instructor"
                      }
                    </span>
                  </div>

                  <div className="flex justify-between mt-4 text-xs text-gray-500">
                    <span className="flex gap-1 items-center">
                      <Clock size={13}/>
                      {course.duration}
                    </span>

                    <span className="flex gap-1 items-center">
                      <Users size={13}/>
                      {course.enrolled || 0}
                    </span>

                    <span className="flex gap-1 items-center">
                      <Star size={13} className="text-yellow-500"/>
                      {course.rating || 0}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="font-semibold text-sm">
                      {course.price === 0 ? "Free" : `₹${course.price}`}
                    </span>

                    <button className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-md hover:bg-indigo-700">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <BottomNav />
    </div>
  );
};
export default Courses;