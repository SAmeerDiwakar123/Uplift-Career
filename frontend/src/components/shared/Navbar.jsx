import React from 'react'
import logo from '../../assets/logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bookmark, LogOut, User2 } from "lucide-react";
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
            <div className="flex items-center gap-4">

              {user?.role === "student" && (
                <button
                  onClick={() => navigate("/saved")}
                  className="md:hidden text-white hover:text-indigo-400 transition"
                >
                  <Bookmark size={25} />
                </button>
              )}

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

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;