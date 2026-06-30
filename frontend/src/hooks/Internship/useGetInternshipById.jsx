import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleInternship } from "@/redux/internshipSlice";
import { INTERNSHIP_API_END_POINT } from "@/utils/constant";

const useGetInternshipById = (internshipId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleInternship = async () => {
      try {
        const res = await axios.get(`${INTERNSHIP_API_END_POINT}/get/${internshipId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleInternship(res.data.internship));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (internshipId) fetchSingleInternship();
  }, [internshipId]);
};

export default useGetInternshipById;