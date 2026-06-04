import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleJob = (jobId) => {

  const dispatch = useDispatch();


  return (
    <div>
      <h1>Get Single Job</h1>
    </div>
  )
}

export default useGetSingleJob