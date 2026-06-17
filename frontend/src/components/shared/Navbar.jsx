import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bookmark, LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { 
        withCredentials: true  
      });
      
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
      <div className='max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center'>

        <img
          src={logo}
          alt="logo"
          onClick={() => navigate('/')}
          className='h-7 sm:h-10 cursor-pointer'
        />

        <div className='hidden md:flex gap-10 ml-10'>
          
          {!user ? (
            <>
              <a href="#explore-jobs" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Explore Jobs
              </a>
              <a href="#how-it-works" className="text-gray-200 hover:text-blue-400 transition text-sm">
                How it works
              </a>
              <a href="#companies" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Companies
              </a>
            </>
          ) : 
          user.role === "recruiter" ? (
            <>
              <Link to="/admin/dashboard" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Dashboard
              </Link>
              <Link to="/admin/add-jobs" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Add Job
              </Link>
              <Link to="/admin/manage-jobs" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Manage Jobs
              </Link>
              <Link to="/admin/create-company" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Create Company
              </Link>
              <Link to="/admin/companies" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Companies
              </Link>
            </>
          ) : 
       
          (
            <>
              <NavLink to="/internship" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Internship
              </NavLink>
              <NavLink to="/jobs" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Jobs
              </NavLink>
              <NavLink to="/saved" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Saved Jobs
              </NavLink>
              <NavLink to="/applications" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Applications
              </NavLink>
              <NavLink to="/courses" className="text-gray-200 hover:text-blue-400 transition text-sm">
                Courses
              </NavLink>
            </>
          )}
        </div>

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
            </div>
          ) : 
          (
            <div className="flex items-center gap-3">

              {user?.role === "student" && (
                <button
                  onClick={() => navigate("/saved")}
                  className="md:hidden text-white hover:text-indigo-400 transition"
                >
                  <Bookmark size={20} />
                </button>
              )}

              <div className="relative">
                
                <div
                  onClick={() => setShowMenu(!showMenu)}
                  className="cursor-pointer h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden border-2 border-indigo-400"
                >
                  {user?.profile?.profilePhoto ? (
                    <img src={user.profile.profilePhoto} alt="avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-white text-sm font-bold">
                      {user?.fullname?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />

                    <div className="absolute right-0 top-11 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">

                      <div className="bg-indigo-50 px-3 py-2.5 flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden shrink-0">
                          {user?.profile?.profilePhoto ? (
                            <img src={user.profile.profilePhoto} alt="avatar" className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-white text-xs font-bold">
                              {user?.fullname?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900">{user?.fullname}</h4>
                          <p className="text-[10px] text-gray-500 line-clamp-1">
                            {user?.profile?.bio || "No bio"}
                          </p>
                        </div>
                      </div>

                      <div className="p-1.5">
                        
       
                        {user?.role === "student" && (
                          <div
                            onClick={() => { 
                              navigate('/profile'); 
                              setShowMenu(false); 
                            }}
                            className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                          >
                            <User2 size={13} className="text-gray-500" />
                            <span className="text-xs text-gray-700">View Profile</span>
                          </div>
                        )}
                        
                        
                        <div
                          onClick={() => { 
                            logoutHandler(); 
                            setShowMenu(false); 
                          }}
                          className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-red-50 transition"
                        >
                          <LogOut size={13} className="text-red-500" />
                          <span className="text-xs text-red-500">Logout</span>
                        </div>
                      </div>

                    </div>
                  </>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;