import { BookOpen, Briefcase, GraduationCap, ClipboardList, User, Building2, PlusCircle, LayoutDashboard, Building, Home, Info, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const studentNavItems = [
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Briefcase, label: "Jobs", path: "/jobs" },
  { icon: GraduationCap, label: "Internship", path: "/internship" },
  { icon: ClipboardList, label: "Applied", path: "/applications" },
  { icon: User, label: "Profile", path: "/profile" },
];

const recruiterNavItems = [
  { icon: PlusCircle, label: "Add Job", path: "/admin/add-jobs" },
  { icon: Briefcase, label: "Manage", path: "/admin/manage-jobs" },
  { icon: Building2, label: "Company", path: "/admin/create-company" },
  { icon: Building, label: "Companies", path: "/admin/companies" },
];

const guestNavItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Info, label: "About", path: "/about" },
  { icon: Phone, label: "Contact", path: "/contact" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);

  let navItems;
  if (!user) {
    navItems = guestNavItems;
  } else if (user?.role === "recruiter") {
    navItems = recruiterNavItems;
  } else {
    navItems = studentNavItems;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-t border-slate-800 z-50 md:hidden">
      <div className="flex items-center justify-around py-1 px-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-lg transition-all duration-200 flex-1 ${
                active
                  ? "text-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[9px] font-medium leading-none">
                {item.label}
              </span>
              {active && (
                <div className="w-1 h-0.5 bg-blue-400 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;