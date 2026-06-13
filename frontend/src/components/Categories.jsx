import React from "react";
import { categories } from "../assets/assets";

const Categories = () => {
  return (
    <section className="py-8 sm:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
            Popular Categories
          </h2>
          <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">
            Explore jobs by category
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-5">

          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white p-2.5 sm:p-5 rounded-lg sm:rounded-xl border border-gray-200 text-center hover:shadow-md transition cursor-pointer"
            >
              <div className="text-xl sm:text-3xl mb-1 sm:mb-2">
                {cat.icon}
              </div>

              <h3 className="text-[10px] sm:text-sm font-semibold text-gray-800 line-clamp-1">
                {cat.name}
              </h3>

              <p className="text-[9px] sm:text-xs text-indigo-600 mt-0.5 sm:mt-1">
                {cat.jobs}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;