import { BookOpen, Briefcase, GraduationCap, ClipboardList, User, Building2, PlusCircle, LayoutDashboard, Building } from "lucide-react";
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

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);

  const navItems = user?.role === "recruiter" ? recruiterNavItems : studentNavItems;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-t border-slate-800 z-50 md:hidden pb-safe">
      <div className="flex items-center justify-around py-1.5">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 rounded-xl transition-all duration-200 min-w-[3.5rem] ${
                active
                  ? "text-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <div className={`relative p-1 rounded-lg transition-all ${
                active ? "bg-blue-500/10" : ""
              }`}>
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              </div>

              <span className="text-[10px] font-medium leading-none">
                {item.label}
              </span>

              {/* Active indicator */}
              {active && (
                <div className="w-1 h-1 bg-blue-400 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;