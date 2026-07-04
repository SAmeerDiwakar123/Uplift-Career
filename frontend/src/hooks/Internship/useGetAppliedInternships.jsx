import { setMyApplications } from "@/redux/internshipSlice";
import { INTERNSHIP_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedInternships = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedInternships = async () => {
      try {
        const res = await axios.get(`${INTERNSHIP_API_END_POINT}/my-applications`, {
          withCredentials: true,
        })

        if(res.data.success){
          dispatch(setMyApplications(res.data.applications))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAppliedInternships();
  }, [])
}

export default useGetAppliedInternships;