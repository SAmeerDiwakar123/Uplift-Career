import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMyApplications } from "@/redux/internshipSlice";
import { INTERNSHIP_API_END_POINT } from "@/utils/constant";


const useGetMyInternshipApplications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${INTERNSHIP_API_END_POINT}/my-applications`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setMyApplications(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, []);
};

export default useGetMyInternshipApplications;