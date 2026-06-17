import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

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
  const { loading } = useSelector((store) => store.auth);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

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

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="overflow-hidden bg-[#f8f8f8] min-h-screen">
      <Navbar />

      <div className="flex justify-center px-3 py-4">
        <div className="w-full max-w-[330px] bg-white rounded-2xl border border-gray-100 shadow-sm p-4">

          {/* Heading */}
          <div className="mb-4">
            <h1 className="text-lg font-bold text-gray-800">
              Create Account 👋
            </h1>

            <p className="text-[11px] text-gray-500 mt-1">
              Register your Uplift account
            </p>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-3">

            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeHandler}
                placeholder="Enter full name"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeHandler}
                placeholder="Enter email"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Phone
              </label>

              <input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeHandler}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeHandler}
                placeholder="Enter password"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Profile Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={fileChangeHandler}
                className="w-full text-[11px] text-gray-500
                file:mr-2
                file:px-3
                file:py-1.5
                file:rounded-lg
                file:border-0
                file:bg-indigo-50
                file:text-indigo-600
                file:text-[11px]
                file:font-medium
                cursor-pointer"
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
              <Button disabled className="w-full text-xs h-9">
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-9 text-xs bg-indigo-600 hover:bg-indigo-700"
              >
                Create Account
              </Button>
            )}
          </form>

          {/* Login Link */}
          <p className="text-[11px] text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;