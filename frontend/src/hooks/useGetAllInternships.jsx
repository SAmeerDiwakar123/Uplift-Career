import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllInternships } from "@/redux/internshipSlice";
import { INTERNSHIP_API_END_POINT } from "@/utils/constant";


const useGetAllInternships = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get(`${INTERNSHIP_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllInternships(res.data.internships));
        }
      } catch (error) {
        console.log("Internships fetch error:", error);
      }
    };

    fetchInternships();
  }, []);
};

export default useGetAllInternships;








// import { setAllInternships } from '@/redux/internshipSlice';
// import { INTERNSHIP_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// const useGetAllInternship = () => {

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchAllInternships = async () => {
//       try {
//         const res = await axios.get(`${INTERNSHIP_API_END_POINT}/get`, {
//           withCredentials: true,
//         })
//         if(res.data.success){
//           dispatch(setAllInternships(res.data.internship))
//         }
        
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchAllInternships();
//   }, [])

//   return (
//     <div>useGetAllInternship</div>
//   )
// }

// export default useGetAllInternship;