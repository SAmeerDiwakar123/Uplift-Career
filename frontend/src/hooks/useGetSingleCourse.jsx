import { setSingleCourse } from '@/redux/courseSlice';
import { COURSE_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleCourse = () => {

  const dispatch = useDispatch();

}

export default useGetSingleCourse