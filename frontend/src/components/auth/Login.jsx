import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
      toast.success(res.data.message);
    } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
  finally {
    dispatch(setLoading(false));
  }
}

return (
  <div className='overflow-hidden'>
    <Navbar />

    <div className='min-h-[calc(100vh-64px)] bg-gray-50 flex items-start sm:items-center justify-center px-4 py-4'>

      <div className='bg-white w-full max-w-md rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8'>

        {/* Heading */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Welcome back!</h1>
          <p className='text-sm text-gray-500 mt-1'>Login to your Uplift account</p>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col gap-5'>

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

          {/* Role */}
          <div className='flex gap-6'>
            <label className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer'>
              <input
                type="radio"
                name="role"
                value='student'
                checked={input.role === 'student'}
                onChange={changeHandler}
                className='accent-indigo-600'
              />
              Student
            </label>

            <label className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer'>
              <input
                type="radio"
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
            loading ? <Button> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
            </Button> : <Button
              type='submit'
              className='w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all mt-1'>
              Login
            </Button>
          }

        </form>

        {/* Register Link */}
        <p className='text-sm text-center text-gray-500 mt-5'>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className='text-indigo-600 font-medium cursor-pointer hover:underline'>
            Register
          </span>
        </p>
      </div>
    </div>
  </div>
)
}

export default Login