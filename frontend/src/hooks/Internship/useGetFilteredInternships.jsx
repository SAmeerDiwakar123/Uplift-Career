import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilterInternships } from "@/redux/internshipSlice";

const useGetFilteredInternships = () => {
  const dispatch = useDispatch();
  const { allInternships, searchInternshipByText } = useSelector(
    (store) => store.internship
  );

  useEffect(() => {
    const filtered = allInternships.filter((internship) => {
      if (!searchInternshipByText) return true;

      return (
        internship?.title
          ?.toLowerCase()
          .includes(searchInternshipByText.toLowerCase()) ||
        internship?.companyName
          ?.toLowerCase()
          .includes(searchInternshipByText.toLowerCase()) ||
        internship?.mode
          ?.toLowerCase()
          .includes(searchInternshipByText.toLowerCase()) ||
        internship?.location
          ?.toLowerCase()
          .includes(searchInternshipByText.toLowerCase())
      );
    });

    dispatch(setFilterInternships(filtered));
  }, [allInternships, searchInternshipByText]);
};

export default useGetFilteredInternships;