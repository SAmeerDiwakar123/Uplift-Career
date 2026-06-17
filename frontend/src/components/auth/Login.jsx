import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success(res.data.message);
        navigate('/jobs');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="overflow-hidden bg-[#f8f8f8] min-h-screen">
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] flex justify-center px-3 py-4">
        <div className="w-full max-w-[320px] sm:max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-8">

          {/* Heading */}
          <div className="mb-4">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
              Welcome back! 👋
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Login to your Uplift account
            </p>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-3">

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeHandler}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeHandler}
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-2">
                Select Role
              </label>

              <div className="flex gap-2">
                <label
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border cursor-pointer text-xs sm:text-sm transition ${
                    input.role === 'student'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeHandler}
                    className="hidden"
                  />
                  Student
                </label>

                <label
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border cursor-pointer text-xs sm:text-sm transition ${
                    input.role === 'recruiter'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeHandler}
                    className="hidden"
                  />
                  Recruiter
                </label>
              </div>
            </div>

            {/* Button */}
            {loading ? (
              <Button
                disabled
                className="w-full py-2 text-xs sm:text-sm"
              >
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 text-xs sm:text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all"
              >
                Login
              </Button>
            )}
          </form>

          {/* Register Link */}
          <p className="text-xs sm:text-sm text-center text-gray-500 mt-4">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;