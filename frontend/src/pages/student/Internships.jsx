import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetAllInternships from "@/hooks/useGetAllInternships";
import useGetFilteredInternships from "@/hooks/useGetFilteredInternships";
import { setSearchInternshipByText } from "@/redux/internshipSlice";
import Navbar from "../../components/shared/Navbar"
import InternshipCard from "../../components/internship/InternshipCard";
import BottomNav from "@/components/shared/BottomNav";
import { Filter, Search } from "lucide-react";

const Internship = () => {
  const dispatch = useDispatch();

  useGetAllInternships();
  useGetFilteredInternships();

  const { filterInternships } = useSelector(
    (store) => store.internship
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 mt-4 sm:mb-6 flex-1">

        <div className="flex items-center justify-between mb-3 sm:mb-6">
          <h1 className="hidden sm:block text-sm sm:text-2xl font-bold text-gray-900">
            💼 Internship
          </h1>

          <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
            {/* Mobile Filter Button */}

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-2 py-1.5 shadow-sm flex-1 sm:flex-none sm:w-64">
              <Search size={14} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search jobs..."
                onChange={(e) => dispatch(setSearchJobByText(e.target.value))}
                className="text-xs text-gray-700 outline-none w-full bg-transparent"
              />
            </div>
          </div>
        </div>


        <p className="hidden sm:block text-xs text-gray-500 mb-4">
          {filterInternships?.length || 0} internships found
        </p>


        {filterInternships?.length === 0 ? (
          <div className="bg-white rounded-xl border p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              No internships found
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Please check again later.
            </p>
          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 pb-24">

            {filterInternships.map((internship) => (
              <InternshipCard
                key={internship._id}
                internship={internship}
              />
            ))}

          </div>

        )}

      </div>

      <BottomNav />

    </div>
  );
};

export default Internship;