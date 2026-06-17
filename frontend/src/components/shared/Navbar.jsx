import React from 'react'
import logo from '../../assets/logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/logout`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-[#111827] shadow-sm sticky top-0 z-50 border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex items-center'>

        {/* Logo */}
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate('/')}
          className='h-10 cursor-pointer'
        />

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-10 ml-10 '>

          {!user ? (
            <>
              <a href="#explore-jobs" className="text-gray-200 hover:text-blue-400 transition">
                Explore Jobs
              </a>

              <a href="#how-it-works" className="text-gray-200 hover:text-blue-400 transition">
                How it works
              </a>

              <a href="#companies" className="text-gray-200 hover:text-blue-400 transition">
                Companies
              </a>
            </>
          ) : user.role === "recruiter" ? (
            <>
              <Link to="/admin/dashboard" className="text-gray-200 hover:text-blue-400 transition">
                Dashboard
              </Link>

              <Link to="/admin/add-jobs" className="text-gray-200 hover:text-blue-400 transition">
                Add Job
              </Link>

              <Link to="/admin/manage-jobs" className="text-gray-200 hover:text-blue-400 transition">
                Manage Jobs
              </Link>

              <Link to="/admin/create-company" className="text-gray-200 hover:text-blue-400 transition">
                Create Company
              </Link>

              <Link to="/admin/companies" className="text-gray-200 hover:text-blue-400 transition">
                Companies
              </Link>
            </>
          ) : (
            <>
              <NavLink to="/internship" className="text-gray-200 hover:text-blue-400 transition">
                Internship
              </NavLink>

              <NavLink to="/jobs" className="text-gray-200 hover:text-blue-400 transition">
                Jobs
              </NavLink>

              <NavLink to="/saved" className="text-gray-200 hover:text-blue-400 transition">
                Saved Jobs
              </NavLink>

              <NavLink to="/applications" className="text-gray-200 hover:text-blue-400 transition">
                Applications
              </NavLink>

              <NavLink to="/courses" className="text-gray-200 hover:text-blue-400 transition">
                Courses
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2">

  {!user ? (
    <div className="flex items-center gap-1.5">

      <Link to="/login">
        <button className="text-white text-[11px] sm:text-sm px-2.5 py-1.5 rounded-lg hover:bg-gray-800 transition">
          Login
        </button>
      </Link>

      <Link to="/signup">
        <button className="bg-indigo-600 text-white text-[11px] sm:text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition">
          Get Started
        </button>
      </Link>

      <button
        onClick={() => navigate('/recruiter')}
        className="hidden sm:block border border-indigo-600 text-indigo-400 text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-600 hover:text-white transition"
      >
        Recruiter
      </button>

    </div>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer h-8 w-8 sm:h-10 sm:w-10">
          <AvatarImage src={user?.profile?.profilePhoto} />
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.profile?.profilePhoto} />
          </Avatar>

          <div>
            <h4 className="text-sm font-semibold">
              {user?.fullname}
            </h4>

            <p className="text-[11px] text-gray-500">
              {user?.profile?.bio || "No bio available"}
            </p>
          </div>
        </div>

        <div className="border-t my-3"></div>

        <div className="flex flex-col gap-1">

          {user?.role === "student" && (
            <div
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
            >
              <User2 size={14} />
              <span className="text-sm">View Profile</span>
            </div>
          )}

          <div
            onClick={logoutHandler}
            className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-red-50 text-red-500"
          >
            <LogOut size={14} />
            <span className="text-sm">Logout</span>
          </div>

        </div>
      </PopoverContent>
    </Popover>
  )}

</div>
      </div>
    </div>
  );
};

export default Navbar;


// import React, { useState } from 'react'
// import logo from '../../assets/logo.svg'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Avatar, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { LogOut, User2 } from "lucide-react";
// import { useDispatch, useSelector } from 'react-redux'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import axios from 'axios'
// import { setUser } from '@/redux/authSlice'

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const { user } = useSelector(store => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/")
//         toast.success(res.data.message)
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className='bg-[#111827] shadow-sm sticky top-0 z-50 border-b border-gray-800'>

//       {/* Main Bar */}
//       <div className='max-w-7xl mx-auto px-4 py-4 flex items-center'>

//         {/* Logo */}
//         <img onClick={() => navigate('/')} src={logo} className='h-10 cursor-pointer' alt="logo" />

//         {/* Desktop Links */}
//         <div className='hidden md:flex gap-12 text-sm text-gray-600 ml-10'>
//           {!user ? (
//             <>
//               <a href="#explore-jobs" className="text-gray-200 hover:text-blue-400 cursor-pointer transition">Explore Jobs</a>
//               <a href="#how-it-works" className="text-gray-200 hover:text-blue-400 cursor-pointer transition">How it works</a>
//               <a href="#companies" className="text-gray-200 hover:text-blue-400 cursor-pointer transition">Companies</a>
//             </>
//           ) : user.role === 'recruiter' ? (
//             <>
//               <Link to="/admin/dashboard" className="text-gray-200 hover:text-blue-400 transition">Dashboard</Link>
//               <Link to="/admin/add-jobs" className="text-gray-200 hover:text-blue-400 transition">Add Job</Link>
//               <Link to="/admin/manage-jobs" className="text-gray-200 hover:text-blue-400 transition">Manage Jobs</Link>
//               <Link to="/admin/create-company" className="text-gray-200 hover:text-blue-400 transition">Create Company</Link>
//               <Link to="/admin/companies" className="text-gray-200 hover:text-blue-400 transition">Companies</Link>
//             </>
//           ) : (
//             <>
//               <NavLink to="/internship" className="text-gray-200 hover:text-blue-400 transition">Internship</NavLink>
//               <NavLink to="/jobs" className="text-gray-200 hover:text-blue-400 transition">Jobs</NavLink>
//               <NavLink to="/saved" className="text-gray-200 hover:text-blue-400 transition">Saved Jobs</NavLink>
//               <NavLink to="/applications" className="text-gray-200 hover:text-blue-400 transition">Applications</NavLink>
//               <NavLink to="/courses" className="text-gray-200 hover:text-blue-400 transition">Courses</NavLink>
//             </>
//           )}
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-3 ml-auto">
//           {!user ? (
//             <div className='hidden md:flex gap-3 items-center'>
//               <Link to='/login'><button className='text-sm text-white hover:text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50'>Login</button></Link>
//               <Link to='/signup'><button className='text-sm bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700'>Get Started</button></Link>
//               <button onClick={() => navigate('/recruiter')} className='text-sm px-5 py-2 rounded-lg font-medium border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300'>Recruiter</button>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage src={user?.profile?.profilePhoto} />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-72 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
//                 <div className='flex gap-3 items-center'>
//                   <Avatar>
//                     <AvatarImage src={user?.profile?.profilePhoto} />
//                   </Avatar>
//                   <div>
//                     <h4 className='font-semibold text-gray-800'>{user?.fullname}</h4>
//                     <p className='text-xs text-gray-500 mt-0.5'>{user?.profile?.bio || "No bio available"}</p>
//                   </div>
//                 </div>
//                 <div className='border-t border-gray-100 my-3'></div>
//                 <div className='flex flex-col gap-1'>
//                   {user && user.role === 'student' && (
//                     <div onClick={() => navigate('/profile')} className='flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-indigo-50 bg-gray-50'>
//                       <User2 className='w-4 h-4 text-gray-600' />
//                       <span className='text-sm font-medium text-gray-700'>View Profile</span>
//                     </div>
//                   )}
//                   <div className='flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-red-50'>
//                     <LogOut className='w-4 h-4' />
//                     <Button onClick={logoutHandler} variant="link" size="sm" className='p-0 h-auto text-red-500'>Logout</Button>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}

//           {/* Hamburger */}
//           <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white text-xl">
//             {mobileOpen ? '✕' : '☰'}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {mobileOpen && (
//         <div className='md:hidden bg-[#1f2937] px-4 py-4 flex flex-col gap-3 border-t border-gray-700'>
//           {!user ? (
//             <>
//               <a href="#explore-jobs" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Explore Jobs</a>
//               <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">How it works</a>
//               <a href="#companies" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Companies</a>
//               <Link to="/login" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Login</Link>
//               <Link to="/signup" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Get Started</Link>
//               <button onClick={() => { navigate('/recruiter'); setMobileOpen(false) }} className="text-indigo-400 text-sm py-2 text-left">Recruiter Login</button>
//             </>
//           ) : user.role === 'recruiter' ? (
//             <>
//               <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Dashboard</Link>
//               <Link to="/admin/add-jobs" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Add Job</Link>
//               <Link to="/admin/manage-jobs" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Manage Jobs</Link>
//               <Link to="/admin/create-company" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Create Company</Link>
//               <Link to="/admin/companies" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Companies</Link>
//               <button onClick={() => { logoutHandler(); setMobileOpen(false) }} className="text-red-400 text-sm py-2 text-left">Logout</button>
//             </>
//           ) : (
//             <>
//               <NavLink to="/jobs" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Jobs</NavLink>
//               <NavLink to="/saved" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Saved Jobs</NavLink>
//               <NavLink to="/applications" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Applications</NavLink>
//               <NavLink to="/courses" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Courses</NavLink>
//               <NavLink to="/profile" onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm py-2 border-b border-gray-700">Profile</NavLink>
//               <button onClick={() => { logoutHandler(); setMobileOpen(false) }} className="text-red-400 text-sm py-2 text-left">Logout</button>
//             </>
//           )}
//         </div>
//       )}

//     </div>
//   )
// }

// export default Navbar;