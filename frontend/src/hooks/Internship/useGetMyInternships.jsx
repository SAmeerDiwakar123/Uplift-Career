import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMyInternships } from "@/redux/internshipSlice";
import { INTERNSHIP_API_END_POINT } from "@/utils/constant";

const useGetMyInternships = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyInternships = async () => {
      try {
        const res = await axios.get(`${INTERNSHIP_API_END_POINT}/my-internships`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setMyInternships(res.data.internships));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyInternships();
  }, []);
};

export default useGetMyInternships;