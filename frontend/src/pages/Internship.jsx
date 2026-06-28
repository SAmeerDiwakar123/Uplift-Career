
import React from "react";
import Navbar from "../components/shared/Navbar";
import BottomNav from "@/components/shared/BottomNav";
import { useSelector } from "react-redux";
import Job from "./Job";

const Internship = () => {
  const { alljobs } = useSelector((store) => store.job);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 mt-4 sm:mb-6 flex-1">
        <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-gray-900">
          💼 Internships
        </h1>

        <p className="text-xs text-gray-500 mt-1 mb-4">
          Find the best internships for you
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 pb-24">
          {alljobs?.filter((job) => job?.jobType?.toLowerCase() === "internship").map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>

        {alljobs?.filter(
          (job) => job?.jobType?.toLowerCase() === "internship"
        ).length === 0 && (
            <div className="bg-white rounded-xl border p-8 text-center">
              <h2 className="text-lg font-semibold text-gray-700">
                No internships found
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Please check again later.
              </p>
            </div>
          )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Internship;
