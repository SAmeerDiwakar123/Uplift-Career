import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSavedJobs, setSavedInternships } from "@/redux/savedJobSlice";


const useGetSavedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const [jobsRes, internshipsRes] = await Promise.all([
          await axios.get(`${SAVED_API_END_POINT}/jobs`, { withCredentials: true }),
          await axios.get(`${SAVED_API_END_POINT}/internships`, { withCredentials: true }),
        ]);

        if (jobsRes.data.success) {
          dispatch(setSavedJobs(jobsRes.data.savedJobs.map((s) => s.job)));
        }
        if (internshipsRes.data.success) {
          dispatch(setSavedInternships(internshipsRes.data.savedInternships.map((s) => s.internship)));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSaved();
  }, []);
};

export default useGetSavedJobs;