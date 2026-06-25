import React from "react";
import { useNavigate } from "react-router-dom";


const CourseCard = ({course}) => {

  const navigate = useNavigate();


  return (

    <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">

      {/* Thumbnail */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover rounded-lg"
      />

      {/* Category */}
      <div className="mt-3">
        <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-600">
          {course.category}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold mt-3">
        {course.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {course.description}
      </p>

      {/* Level + Price */}
      <div className="flex justify-between items-center mt-4">


        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {course.level}
        </span>


        <span className="font-bold">
          ₹{course.price}
        </span>


      </div>



      {/* Button */}
      <button

        onClick={() => navigate(`/course/${course._id}`)}

        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg text-sm hover:bg-indigo-700"

      >

        View Course

      </button>


    </div>

  )

}


export default CourseCard;