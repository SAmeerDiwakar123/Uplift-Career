import React from "react";

const ExploreJobs = () => {
  const items = [
    "Remote Jobs",
    "Full-Time Jobs",
    "Part-Time Jobs",
    "Work From Home",
    "Startup Jobs",
    "MNC Jobs",
  ];

  return (
    <section id="explore-jobs" className="py-8 sm:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
          Explore Jobs
        </h2>
        <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">
          Discover opportunities based on your preferences
        </p>

        <div className="mt-6 sm:mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-3 sm:p-6 rounded-lg sm:rounded-xl border hover:shadow-md transition cursor-pointer"
            >
              <h3 className="text-xs sm:text-base font-semibold text-gray-800">{item}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreJobs;