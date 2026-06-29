import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bookmark, LogOut, User2, Menu, X, Briefcase, GraduationCap, LayoutDashboard, Building2, PlusCircle, ListChecks, Home, Info, Phone } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import logo from '../../assets/logo.svg';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { 
        withCredentials: true  
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");              
        toast.success(res.data.message);  
        setShowMenu(false);
        setShowMobileMenu(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const navLinkStyles = ({ isActive }) => 
    `text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
      isActive 
        ? 'text-blue-400' 
        : 'text-slate-400 hover:text-slate-200'
    }`;

  // Navigation items based on user role
  const getNavItems = () => {
    if (!user) {
      return [
        { path: '/', label: 'Home', icon: Home },
        { path: '/about', label: 'About', icon: Info },
        { path: '/contact', label: 'Contact', icon: Phone },
      ];
    }

    if (user.role === 'recruiter') {
      return [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/add-jobs', label: 'Add Job', icon: PlusCircle },
        { path: '/admin/manage-jobs', label: 'Manage Jobs', icon: ListChecks },
        { path: '/admin/create-company', label: 'Create Company', icon: Building2 },
        { path: '/admin/companies', label: 'Companies', icon: Building2 },
      ];
    }

    // Student role
    return [
      { path: '/internship', label: 'Internship', icon: GraduationCap },
      { path: '/jobs', label: 'Jobs', icon: Briefcase },
      { path: '/saved', label: 'Saved', icon: Bookmark },
      { path: '/applications', label: 'Applications', icon: ListChecks },
      { path: '/courses', label: 'Courses', icon: GraduationCap },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className='bg-slate-950 border-b border-slate-800/50 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 py-3 sm:py-3.5'>
        <div className='flex items-center justify-between'>

          {/* Logo */}
          <div 
            onClick={() => navigate('/')} 
            className='flex items-center gap-2 cursor-pointer'
          >
            <img
              src={logo}
              alt="Uplift Career"
              className='h-7 sm:h-9'
            />
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-6 lg:gap-8'>
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={navLinkStyles}
              >
                <item.icon size={15} />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side - Auth / User Menu */}
          <div className="flex items-center gap-2">
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <button className="text-slate-400 text-sm px-3 py-1.5 rounded-lg hover:text-slate-200 transition-all">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-blue-500 transition-all font-medium">
                    Get Started
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-3">

                {/* Saved Jobs - Mobile Only */}
                {user?.role === "student" && (
                  <button
                    onClick={() => navigate("/saved")}
                    className="md:hidden text-slate-400 hover:text-blue-400 transition p-1.5"
                    aria-label="Saved Jobs"
                  >
                    <Bookmark size={20} />
                  </button>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden text-slate-400 hover:text-slate-200 transition p-1.5"
                  aria-label="Toggle Menu"
                >
                  {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
                </button>

                {/* User Avatar / Menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all focus:outline-none"
                    aria-label="User Menu"
                  >
                    {user?.profile?.profilePhoto ? (
                      <img 
                        src={user.profile.profilePhoto} 
                        alt={user?.fullname || 'User'} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-slate-300 text-sm font-bold">
                        {user?.fullname?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute right-0 top-11 w-52 bg-slate-900 rounded-xl shadow-xl border border-slate-800 overflow-hidden">

                      {/* User Info */}
                      <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-800">
                        <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 border border-slate-700">
                          {user?.profile?.profilePhoto ? (
                            <img src={user.profile.profilePhoto} alt={user?.fullname} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-slate-300 text-sm font-bold">
                              {user?.fullname?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {user?.fullname || 'User'}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {user?.profile?.bio || user?.role || 'Member'}
                          </p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-1">
                        {user?.role === "student" && (
                          <button
                            onClick={() => { 
                              navigate('/profile'); 
                              setShowMenu(false); 
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 transition-all text-left"
                          >
                            <User2 size={15} className="text-slate-500" />
                            <span className="text-sm text-slate-300">View Profile</span>
                          </button>
                        )}

                        {user?.role === "recruiter" && (
                          <button
                            onClick={() => { 
                              navigate('/admin/dashboard'); 
                              setShowMenu(false); 
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800 transition-all text-left"
                          >
                            <LayoutDashboard size={15} className="text-slate-500" />
                            <span className="text-sm text-slate-300">Dashboard</span>
                          </button>
                        )}

                        <button
                          onClick={logoutHandler}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-950/30 transition-all text-left"
                        >
                          <LogOut size={15} className="text-red-400" />
                          <span className="text-sm text-red-400">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && user && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800/50">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;