import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setLoading } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import { Loader2, User, Mail, Phone, Lock, Upload, GraduationCap, Briefcase } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: null,
  });

  const [fileName, setFileName] = useState('');

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setFileName(file.name);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.file) {
      toast.error('Please select profile photo');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    formData.append('file', input.file);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6">

          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-lg font-bold text-gray-900">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Start your career journey with Uplift
            </p>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">

            {/* Full Name */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeHandler}
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeHandler}
                  placeholder="Enter your phone number"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeHandler}
                  placeholder="Create a password"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Profile Photo
              </label>
              <div className="relative">
                <Upload size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={fileChangeHandler}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                />
              </div>
              {fileName && (
                <p className="text-xs text-indigo-600 mt-1.5 font-medium">
                  ✓ {fileName}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    input.role === 'student'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
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
                  <GraduationCap size={16} />
                  <span className="text-sm font-medium">Student</span>
                </label>

                <label
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    input.role === 'recruiter'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
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
                  <Briefcase size={16} />
                  <span className="text-sm font-medium">Recruiter</span>
                </label>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 bg-gray-50 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 accent-indigo-600"
              />
              <label className="text-xs text-gray-500 leading-relaxed">
                I agree to the{' '}
                <span className="text-indigo-600 hover:underline cursor-pointer font-medium">
                  Terms & Conditions
                </span>{' '}
                and{' '}
                <span className="text-indigo-600 hover:underline cursor-pointer font-medium">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                loading
                  ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Please wait...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-xs text-center text-gray-500 mt-4">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
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

export default Signup;






// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading } from '@/redux/authSlice'
// import { Button } from '../ui/button'
// import { Loader2 } from 'lucide-react'

// const SignUp = () => {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: "",
//   });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((store) => store.auth);

//   const changeHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileChangeHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!input.file) {
//       toast.error("Please select profile photo");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("password", input.password);
//     formData.append("role", input.role);
//     formData.append("file", input.file);

//     try {
//       dispatch(setLoading(true));

//       const res = await axios.post(
//         `${USER_API_END_POINT}/register`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/login");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="overflow-hidden bg-[#f8f8f8] min-h-screen">
//       <Navbar />

//       <div className="flex justify-center px-3 py-4">
//         <div className="w-full max-w-[330px] bg-white rounded-2xl border border-gray-100 shadow-sm p-4">

//           {/* Heading */}
//           <div className="mb-4">
//             <h1 className="text-lg font-bold text-gray-800">
//               Create Account 👋
//             </h1>

//             <p className="text-[11px] text-gray-500 mt-1">
//               Register your Uplift account
//             </p>
//           </div>

//           <form onSubmit={submitHandler} className="flex flex-col gap-3">

//             {/* Full Name */}
//             <div>
//               <label className="block text-[11px] font-medium text-gray-700 mb-1">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 name="fullname"
//                 value={input.fullname}
//                 onChange={changeHandler}
//                 placeholder="Enter full name"
//                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-[11px] font-medium text-gray-700 mb-1">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 name="email"
//                 value={input.email}
//                 onChange={changeHandler}
//                 placeholder="Enter email"
//                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-[11px] font-medium text-gray-700 mb-1">
//                 Phone
//               </label>

//               <input
//                 type="text"
//                 name="phoneNumber"
//                 value={input.phoneNumber}
//                 onChange={changeHandler}
//                 placeholder="Enter phone number"
//                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-[11px] font-medium text-gray-700 mb-1">
//                 Password
//               </label>

//               <input
//                 type="password"
//                 name="password"
//                 value={input.password}
//                 onChange={changeHandler}
//                 placeholder="Enter password"
//                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               />
//             </div>

//             {/* Profile Photo */}
//             <div>
//               <label className="block text-[11px] font-medium text-gray-700 mb-1">
//                 Profile Photo
//               </label>

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={fileChangeHandler}
//                 className="w-full text-[11px] text-gray-500
//                 file:mr-2
//                 file:px-3
//                 file:py-1.5
//                 file:rounded-lg
//                 file:border-0
//                 file:bg-indigo-50
//                 file:text-indigo-600
//                 file:text-[11px]
//                 file:font-medium
//                 cursor-pointer"
//               />
//             </div>

//             {/* Role */}
//             <div>
//               <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-2">
//                 Select Role
//               </label>

//               <div className="flex gap-2">
//                 <label
//                   className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border cursor-pointer text-xs sm:text-sm transition ${
//                     input.role === 'student'
//                       ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
//                       : 'border-gray-200 text-gray-600'
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="role"
//                     value="student"
//                     checked={input.role === 'student'}
//                     onChange={changeHandler}
//                     className="hidden"
//                   />
//                   Student
//                 </label>

//                 <label
//                   className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border cursor-pointer text-xs sm:text-sm transition ${
//                     input.role === 'recruiter'
//                       ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
//                       : 'border-gray-200 text-gray-600'
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="role"
//                     value="recruiter"
//                     checked={input.role === 'recruiter'}
//                     onChange={changeHandler}
//                     className="hidden"
//                   />
//                   Recruiter
//                 </label>
//               </div>
//             </div>

//             {/* Button */}
//             {loading ? (
//               <Button disabled className="w-full text-xs h-9">
//                 <Loader2 className="mr-2 h-3 w-3 animate-spin" />
//                 Please wait...
//               </Button>
//             ) : (
//               <Button
//                 type="submit"
//                 className="w-full h-9 text-xs bg-indigo-600 hover:bg-indigo-700"
//               >
//                 Create Account
//               </Button>
//             )}
//           </form>

//           {/* Login Link */}
//           <p className="text-[11px] text-center text-gray-500 mt-4">
//             Already have an account?{" "}
//             <span
//               onClick={() => navigate("/login")}
//               className="text-indigo-600 font-medium cursor-pointer hover:underline"
//             >
//               Login
//             </span>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;