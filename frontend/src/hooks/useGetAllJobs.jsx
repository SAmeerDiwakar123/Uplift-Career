import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';


const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {withCredentials: true});

        if(res.data.success){
          dispatch(setAllJobs(res.data.jobs));
        }
      }
      catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
    fetchAllJobs(); 
  }, [])
  return {loading};
};

export default useGetAllJobs