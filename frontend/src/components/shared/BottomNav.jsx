// src/components/shared/BottomNav.jsx
import { Home, Briefcase, GraduationCap, ClipboardList, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { icon: <Home size={20} />, label: 'Home', path: '/' },
  { icon: <Briefcase size={20} />, label: 'Jobs', path: '/jobs' },
  { icon: <GraduationCap size={20} />, label: 'Internship', path: '/internship' },
  { icon: <ClipboardList size={20} />, label: 'Applied', path: '/applications' },
  { icon: <User size={20} />, label: 'Profile', path: '/profile' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.icon}
              <span className={`text-[10px] font-medium ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-indigo-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;