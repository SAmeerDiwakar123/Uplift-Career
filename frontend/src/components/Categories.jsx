import React from "react";
import { categories } from "../assets/assets";

const Categories = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Categories
          </h2>
          <p className="text-gray-500 mt-2">
            Explore jobs by category
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-gray-200 text-center hover:shadow-md transition cursor-pointer"
            >
              <div className="text-3xl mb-2">
                {cat.icon}
              </div>

              <h3 className="text-sm font-semibold text-gray-800">
                {cat.name}
              </h3>

              <p className="text-xs text-indigo-600 mt-1">
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