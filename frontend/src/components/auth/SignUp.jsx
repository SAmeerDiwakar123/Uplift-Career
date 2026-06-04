import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import store from '@/redux/store';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const SignUp = () => {

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth)

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.file) {
      toast.error("Please select profile photo");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("file", input.file);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className='overflow-hidden'>
      <Navbar />

      {/* 🔥 FIXED CONTAINER */}x``
      <div className='min-h-[calc(100vh-64px)] bg-gray-50 flex items-start sm:items-center justify-center px-4 py-4'>

        <div className='bg-white w-full max-w-md rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8'>

          {/* Heading */}
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-gray-800'>Create Account</h1>
            <p className='text-sm text-gray-500 mt-1'>Register your Uplift account</p>
          </div>

          <form onSubmit={submitHandler} className='flex flex-col gap-5'>

            {/* Fullname */}
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>Full Name</label>
              <input
                type='text'
                name='fullname'
                value={input.fullname}
                onChange={changeHandler}
                placeholder='Enter your full name'
                className='w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' />
            </div>

            {/* Email */}
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>Email</label>
              <input
                type='email'
                name='email'
                value={input.email}
                onChange={changeHandler}
                placeholder='Enter your email'
                className='w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' />
            </div>

            {/* Phone */}
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>Phone Number</label>
              <input
                type='text'
                name='phoneNumber'
                value={input.phoneNumber}
                onChange={changeHandler}
                placeholder='Enter your phone number'
                className='w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' />
            </div>

            {/* Password */}
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>Password</label>
              <input
                type='password'
                name='password'
                value={input.password}
                onChange={changeHandler}
                placeholder='Enter your password'
                className='w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' />
            </div>

            {/* Profile Photo */}
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>Profile Photo</label>
              <input
                type='file'
                accept='image/*'
                onChange={fileChangeHandler}
                className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer' />
            </div>

            {/* Role */}
            <div className='flex gap-6'>
              <label className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer'>
                <input
                  type='radio'
                  name='role'
                  value='student'
                  checked={input.role === 'student'}
                  onChange={changeHandler}
                  className='accent-indigo-600'
                />
                Student
              </label>

              <label className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer'>
                <input
                  type='radio'
                  name='role'
                  value='recruiter'
                  checked={input.role === 'recruiter'}
                  onChange={changeHandler}
                  className='accent-indigo-600'
                />
                Recruiter
              </label>
            </div>

            {/* Button */}
            {
              loading ? <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
              </Button> :
                <Button
                  type='submit'
                  className='w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all mt-1'>
                  Create Account
                </Button>
            }
          </form>

          {/* Login Link */}
          <p className='text-sm text-center text-gray-500 mt-5'>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className='text-indigo-600 font-medium cursor-pointer hover:underline'>
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default SignUp





// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar';

// const SignUp = () => {

//   const [input , setInput ] = useState({
//     fullname:"",
//     email:"",
//     phoneNumber:"",
//     password:"",
//     role:"",
//     file:"",
//   });

//   return (
//     <div>
//       <Navbar/>
//       <div>
//         <div>
//           <div>
//             <h1>Hello</h1>
//             <p>Register your account </p>

//             <form action="">

//               <div className='flex flex-col gap-1'>
//                 <label>Fullname</label>
//                 <input
//                 type="fullname"
//                 name="fullname"
//                 value={input.fullname}
//                 placeholder='Enter your FullName'
//                 className=''
//                 />
//               </div>

//               <div className='flex flex-col gap-1'>
//                 <label>Email</label>
//                 <input
//                 type="email"
//                 name='email'
//                 value={input.email}
//                 placeholder='Enter your email'
//                 className=''
//                 />
//               </div>

//               <div className='flex flex-col gap-1'>
//                 <label >PhoneNumber</label>
//                 <input
//                 type="phoneNumber"
//                 name='phoneNumber'
//                 value={input.phoneNumber}
//                 placeholder='Enter your PhoneNumber'
//                 className=''
//                 />
//               </div>

//               <div className='flex flex-col gap-1'>
//                 <label>Password</label>
//                 <input
//                 type="password"
//                 name='password'
//                 value={input.password}
//                 placeholder='Enter your password'
//                 className=''
//                 />
//               </div>

//               <div className='flex gap-6'>
//                 <label>
//                   <input
//                   type="radio"
//                   name='role'
//                   value='student'
//                   checked={input.role === 'student'}
//                   className='accent-indigo-600'
//                   />
//                   Student
//                 </label>
//                 <label>
//                   <input
//                   type="radio"
//                   name="role"
//                   value='recruiter'
//                   checked={input.role === 'recruiter'}
//                   className='accent-indigo-600'
//                   />
//                   Recruiter
//                 </label>
//               </div>

//               <button type='submit'>
//                 Sign Up
//               </button>

//             </form>

//             <p className=''>
//               <span>
//                 Login
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignUp