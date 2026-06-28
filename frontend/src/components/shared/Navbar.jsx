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
    `text-gray-300 hover:text-purple-300 transition-all duration-200 text-sm flex items-center gap-1.5 ${
      isActive ? 'text-purple-300 font-medium' : ''
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
      { path: '/saved', label: 'Saved Jobs', icon: Bookmark },
      { path: '/applications', label: 'Applications', icon: ListChecks },
      { path: '/courses', label: 'Courses', icon: GraduationCap },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className='bg-[#0a0a0a] shadow-sm sticky top-0 z-50 border-b border-[#222] backdrop-blur-lg bg-opacity-80'>
      <div className='max-w-7xl mx-auto px-4 py-3 sm:py-4'>
        <div className='flex items-center justify-between'>
          
          {/* Logo */}
          <div 
            onClick={() => navigate('/')} 
            className='flex items-center gap-2 cursor-pointer'
          >
            <img
              src={logo}
              alt="Uplift Career"
              className='h-7 sm:h-10'
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
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side - Auth / User Menu */}
          <div className="flex items-center gap-2">
            {!user ? (
              <div className="flex items-center gap-1.5">
                <Link to="/login">
                  <button className="text-gray-300 text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:text-purple-300 hover:bg-[#1a1a1a] transition-all duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-purple-700 text-white text-xs sm:text-sm px-4 py-1.5 rounded-lg hover:bg-purple-600 transition-all duration-200 hover:scale-105">
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
                    className="md:hidden text-gray-300 hover:text-purple-300 transition p-1.5"
                    aria-label="Saved Jobs"
                  >
                    <Bookmark size={20} />
                  </button>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden text-gray-300 hover:text-purple-300 transition p-1.5"
                  aria-label="Toggle Menu"
                >
                  {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* User Avatar / Menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-purple-700 flex items-center justify-center overflow-hidden border-2 border-purple-400 hover:border-purple-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                    aria-label="User Menu"
                  >
                    {user?.profile?.profilePhoto ? (
                      <img 
                        src={user.profile.profilePhoto} 
                        alt={user?.fullname || 'User'} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm font-bold">
                        {user?.fullname?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute right-0 top-11 w-56 bg-[#1a1a1a] rounded-xl shadow-2xl border border-[#333] overflow-hidden animate-slideDown">
                      
                      {/* User Info */}
                      <div className="bg-[#111827] px-4 py-3 flex items-center gap-3 border-b border-[#222]">
                        <div className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center overflow-hidden shrink-0">
                          {user?.profile?.profilePhoto ? (
                            <img src={user.profile.profilePhoto} alt={user?.fullname} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-white text-sm font-bold">
                              {user?.fullname?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {user?.fullname || 'User'}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">
                            {user?.profile?.bio || user?.role || 'Member'}
                          </p>
                          <span className="text-[10px] text-purple-400 font-medium uppercase">
                            {user?.role}
                          </span>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-1.5">
                        {user?.role === "student" && (
                          <button
                            onClick={() => { 
                              navigate('/profile'); 
                              setShowMenu(false); 
                            }}
                            className="w-full flex items-center gap-2.5 cursor-pointer px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-all duration-200"
                          >
                            <User2 size={15} className="text-gray-400" />
                            <span className="text-sm text-gray-300">View Profile</span>
                          </button>
                        )}

                        {user?.role === "recruiter" && (
                          <button
                            onClick={() => { 
                              navigate('/admin/dashboard'); 
                              setShowMenu(false); 
                            }}
                            className="w-full flex items-center gap-2.5 cursor-pointer px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-all duration-200"
                          >
                            <LayoutDashboard size={15} className="text-gray-400" />
                            <span className="text-sm text-gray-300">Dashboard</span>
                          </button>
                        )}

                        <button
                          onClick={logoutHandler}
                          className="w-full flex items-center gap-2.5 cursor-pointer px-3 py-2 rounded-lg hover:bg-red-900/20 transition-all duration-200"
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
          <div className="md:hidden mt-3 pt-3 border-t border-[#222] animate-slideDown">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-purple-900/30 text-purple-300' 
                        : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-purple-300'
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

      {/* Custom Animation Keyframes - Add to your global CSS */}
<style>{`
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-slideDown {
    animation: slideDown 0.2s ease-out;
  }
`}</style>
    </nav>
  );
};

export default Navbar;