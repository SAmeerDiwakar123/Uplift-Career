import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setLoading, setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import { Loader2, Mail, Lock, Eye, EyeOff, GraduationCap, Briefcase } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
        
        // Role-based navigation
        if (res.data.user?.role === 'recruiter') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center px-3 py-8">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-8">

          {/* Heading */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
              🔐 Secure Login
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
              Welcome Back! 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Login to your Uplift account
            </p>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={input.password}
                  onChange={changeHandler}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    input.role === 'student'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
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
                  <GraduationCap size={18} />
                  <span className="text-sm font-medium">Student</span>
                </label>

                <label
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    input.role === 'recruiter'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
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
                  <Briefcase size={18} />
                  <span className="text-sm font-medium">Recruiter</span>
                </label>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 bg-gray-50 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 accent-purple-600"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <span className="text-sm text-purple-600 hover:underline cursor-pointer font-medium">
                Forgot Password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Please wait...
                </span>
              ) : (
                'Login →'
              )}
            </button>
          </form>

          {/* Role Indicators */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <GraduationCap size={14} className="text-purple-500" />
              <span>Student</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <Briefcase size={14} className="text-indigo-500" />
              <span>Recruiter</span>
            </div>
          </div>

          {/* Signup Link */}
          <p className="text-sm text-center text-gray-500 mt-5">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-purple-600 font-semibold cursor-pointer hover:underline"
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