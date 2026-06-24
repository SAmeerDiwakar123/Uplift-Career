import { setCourses } from '@/redux/courseSlice';
import { COURSE_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCourses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get(`${COURSE_API_END_POINT}/get`, {withCredentials: true})

        if(res.data.courses){
          dispatch(setCourses(res.data.courses))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllCourses();
  }, [dispatch])
}

export default useGetAllCourses