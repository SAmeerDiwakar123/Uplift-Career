import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bookmark,LogOut,User2,Briefcase,GraduationCap,LayoutDashboard,Building2,
  PlusCircle,ListChecks,Home,Info,Phone,Bell, 
  LayoutDashboardIcon} from "lucide-react";
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
  const menuRef = useRef(null);

  // ✅ Notification se unreadCount le rahe hain
  const { unreadCount } = useSelector((store) => store.notification);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout handler
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
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  // NavLink styles
  const navLinkStyles = ({ isActive }) =>
    `text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${isActive
      ? 'text-blue-400'
      : 'text-slate-400 hover:text-slate-200'
    }`;

  // Get navigation items based on user role
  const getNavItems = () => {
    if (!user) {
      return [
        { path: '/', label: 'Home', icon: Home },
        { path: '/about', label: 'About', icon: Info },
        { path: '/contact', label: 'Contact', icon: Phone },
      ];
    }

    if (user.role === "recruiter") {
      return [
        { path: '/recruiter/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/recruiter/add-jobs', label: 'Add Job', icon: PlusCircle },
        { path: '/recruiter/add-internship', label: 'Add Internship', icon: PlusCircle },
        { path: '/recruiter/manage-jobs', label: 'Manage Jobs', icon: ListChecks },
        { path: '/recruiter/manage-internships', label: 'Manage Internship', icon: ListChecks },
        { path: '/recruiter/create-company', label: 'Create Company', icon: Building2 },
        { path: '/recruiter/companies', label: 'Companies', icon: Building2 },
      ];
    }

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
      <div className='max-w-7xl mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>

          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className='flex items-center gap-2 cursor-pointer'
          >
            <img src={logo} alt="Uplift Career" className='h-10 sm:h-10' />
          </div>

          {/* Navigation Links - Desktop */}
          <div className='hidden md:flex items-center gap-6 lg:gap-8'>
            {navItems.map(item => (
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

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">

            {/* Notification Bell - 🔔 */}
            {user && (
              <div 
                className="relative cursor-pointer" 
                onClick={() => navigate("/notifications")}
              >
                <Bell 
                  size={18} 
                  className="text-slate-400 hover:text-blue-400 transition" 
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-indigo-500 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
            )}

            {/* Saved Button (Student Only) - MOBILE ONLY */}
            {user?.role === "student" && (
              <button
                onClick={() => navigate("/saved")}
                className="text-slate-400 hover:text-blue-400 transition md:hidden"
              >
                <Bookmark size={20} />
              </button>
            )}

            {/* Auth Buttons */}
            {!user ? (
              <div className="flex gap-2">
                <Link to="/login">
                  <button className="text-slate-400 text-sm px-3 py-1.5">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            ) : (
              /* Profile Dropdown */
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700"
                >
                  {user?.profile?.profilePhoto ? (
                    <img
                      src={user.profile.profilePhoto}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white">
                      {user?.fullname?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-12 w-52 bg-slate-900 border border-slate-800 rounded-xl">

                    {/* Dropdown Header */}
                    <div className="p-3 border-b border-slate-800">
                      <h4 className="text-white text-sm">
                        {user?.fullname}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {user?.role}
                      </p>
                    </div>

                    {/* Dropdown Actions */}
                    <div className="p-2">
                      {user.role === "student" && (
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setShowMenu(false);
                          }}
                          className="flex gap-2 items-center w-full px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg"
                        >
                          <User2 size={15} />
                          Profile
                        </button>
                      )}
                      <div className='p-2'>
                        {user.role === "student" &&(
                      <button onClick={() => {
                          navigate("/StudentDashboard");
                          setShowMenu(false);
                      }} className='flex gap-2 items-center w-full px-3 py-2 text-emerald-400 hover:bg-emerald-950 rounded-lg'>
                        <LayoutDashboardIcon size={15} /> Dashboard
                      </button>
                        )}
                      </div>

                      
                      <button
                        onClick={logoutHandler}
                        className="flex gap-2 items-center w-full px-3 py-2 text-red-400 hover:bg-red-950 rounded-lg"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;





// import React, { useState, useRef, useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { 
//   Bookmark, 
//   LogOut, 
//   User2, 
//   Briefcase, 
//   GraduationCap, 
//   LayoutDashboard, 
//   Building2, 
//   PlusCircle, 
//   ListChecks, 
//   Home, 
//   Info, 
//   Phone 
// } from "lucide-react";
// import { useDispatch, useSelector } from 'react-redux';
// import { USER_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import axios from 'axios';
// import { setUser } from '@/redux/authSlice';
// import logo from '../../assets/logo.svg';

// const Navbar = () => {
//   const { user } = useSelector(store => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [showMenu, setShowMenu] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);


//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true
//       });

//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//         setShowMenu(false);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Logout failed");
//     }
//   };


//   const navLinkStyles = ({ isActive }) =>
//     `text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
//       isActive 
//         ? 'text-blue-400'
//         : 'text-slate-400 hover:text-slate-200'
//     }`;


//   const getNavItems = () => {
//     if (!user) {
//       return [
//         { path: '/', label: 'Home', icon: Home },
//         { path: '/about', label: 'About', icon: Info },
//         { path: '/contact', label: 'Contact', icon: Phone },
//       ];
//     }

//     if (user.role === "recruiter") {
//       return [
//         { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
//         { path: '/admin/add-jobs', label: 'Add Job', icon: PlusCircle },
//         { path: '/admin/manage-jobs', label: 'Manage Jobs', icon: ListChecks },
//         { path: '/admin/create-company', label: 'Create Company', icon: Building2 },
//         { path: '/admin/companies', label: 'Companies', icon: Building2 },
//       ];
//     }

//     return [
//       { path: '/internship', label: 'Internship', icon: GraduationCap },
//       { path: '/jobs', label: 'Jobs', icon: Briefcase },
//       { path: '/saved', label: 'Saved', icon: Bookmark },
//       { path: '/applications', label: 'Applications', icon: ListChecks },
//       { path: '/courses', label: 'Courses', icon: GraduationCap },
//     ];
//   };


//   const navItems = getNavItems();


//   return (
//     <nav className='bg-slate-950 border-b border-slate-800/50 sticky top-0 z-50'>
//       <div className='max-w-7xl mx-auto px-4 py-3'>
//         <div className='flex items-center justify-between'>

//           {/* Logo */}
//           <div
//             onClick={() => navigate('/')}
//             className='flex items-center gap-2 cursor-pointer'
//           >
//             <img src={logo} alt="Uplift Career" className='h-8 sm:h-' />
//           </div>

//           {/* Navigation Links */}
//           <div className='hidden md:flex items-center gap-6 lg:gap-8'>
//             {navItems.map(item => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={navLinkStyles}
//               >
//                 <item.icon size={15} />
//                 {item.label}
//               </NavLink>
//             ))}
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-3">

//             {/* Saved Button (Student Only) - MOBILE ONLY */}
//             {user?.role === "student" && (
//               <button
//                 onClick={() => navigate("/saved")}
//                 className="text-slate-400 hover:text-blue-400 transition md:hidden"
//               >
//                 <Bookmark size={20} />
//               </button>
//             )}

//             {/* Auth Buttons */}
//             {!user ? (
//               <div className="flex gap-2">
//                 <Link to="/login">
//                   <button className="text-slate-400 text-sm px-3 py-1.5">
//                     Login
//                   </button>
//                 </Link>

//                 <Link to="/signup">
//                   <button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg">
//                     Get Started
//                   </button>
//                 </Link>
//               </div>
//             ) : (
//               /* Profile Dropdown */
//               <div className="relative" ref={menuRef}>
//                 <button
//                   onClick={() => setShowMenu(!showMenu)}
//                   className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700"
//                 >
//                   {user?.profile?.profilePhoto ? (
//                     <img 
//                       src={user.profile.profilePhoto}
//                       className="h-full w-full rounded-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-white">
//                       {user?.fullname?.charAt(0).toUpperCase()}
//                     </span>
//                   )}
//                 </button>

//                 {showMenu && (
//                   <div className="absolute right-0 top-12 w-52 bg-slate-900 border border-slate-800 rounded-xl">
                    
//                     {/* Dropdown Header */}
//                     <div className="p-3 border-b border-slate-800">
//                       <h4 className="text-white text-sm">
//                         {user?.fullname}
//                       </h4>
//                       <p className="text-xs text-slate-500">
//                         {user?.role}
//                       </p>
//                     </div>

//                     {/* Dropdown Actions */}
//                     <div className="p-2">
//                       {user.role === "student" && (
//                         <button
//                           onClick={() => {
//                             navigate("/profile");
//                             setShowMenu(false);
//                           }}
//                           className="flex gap-2 items-center w-full px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg"
//                         >
//                           <User2 size={15} />
//                           Profile
//                         </button>
//                       )}

//                       <button
//                         onClick={logoutHandler}
//                         className="flex gap-2 items-center w-full px-3 py-2 text-red-400 hover:bg-red-950 rounded-lg"
//                       >
//                         <LogOut size={15} />
//                         Logout
//                       </button>
//                     </div>

//                   </div>
//                 )}
//               </div>
//             )}

//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;