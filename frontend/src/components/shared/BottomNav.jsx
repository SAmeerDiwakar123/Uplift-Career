import { BookOpen,Briefcase,GraduationCap,ClipboardList,User,Building2,PlusCircle,LayoutDashboard, Building, } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const studentNavItems  = [
  { icon: <BookOpen size={20} />, label: "courses", path: "/courses",},
  {icon: <Briefcase size={20} />,label: "Jobs",path: "/jobs", },
  { icon: <GraduationCap size={20} />,label: "Internship",path: "/internship", },
  { icon: <ClipboardList size={20} />,label: "Applied",path: "/applications",},
  { icon: <User size={20} />, label: "Profile",path: "/profile", },
];

const recruiterNavItems = [
  { icon: <PlusCircle size={20}/>, label: "Add Job", path: "/admin/add-jobs"},
  { icon: <Briefcase size={20}/>, label: "Manage", path: "/admin/manage-jobs"},
  { icon: <Building2 size={20}/>, label: "Create Company", path: "/admin/create-company"}, 
  { icon: <Building size={20} />,label: "Companies",path: "/admin/companies",},
]

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);
  
  const navItems = user?.role === "recruiter" ? recruiterNavItems : studentNavItems;


  const isActive = (path) => {
    return location.pathname === path;
  };


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 ${isActive(item.path)
                ? "text-indigo-600"
                : "text-gray-400"
              }`}
          >
            {item.icon}

            <span className="text-[10px] font-medium">
              {item.label}
            </span>

            {isActive(item.path) && (
              <div className="w-1 h-1 bg-indigo-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;