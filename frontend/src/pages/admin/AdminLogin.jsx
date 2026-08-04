import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${ADMIN_API_END_POINT}/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // 1. Token ko localStorage me save karein
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        // 2. Redux store me dummy admin profile set karein
        dispatch(setUser({ email: input.email, role: "admin" }));

        toast.success(res.data.message);

        // 3. Dashboard par navigate karein
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-sm rounded-2xl p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-4">
            <ShieldCheck className="text-indigo-600" size={28} />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-400 mt-1 text-center">
            Access Uplift Career admin panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="admin@upliftcareer.com"
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-semibold flex justify-center items-center gap-2 transition disabled:opacity-60 mt-1"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Logging in...
              </>
            ) : (
              "Login to Admin Panel"
            )}
          </button>

        </form>

        {/* Back link */}
        <p
          onClick={() => navigate('/')}
          className="text-xs text-center text-gray-400 mt-5 cursor-pointer hover:text-gray-600"
        >
          ← Back to home
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { Loader2, ShieldCheck } from "lucide-react";
// import { ADMIN_API_END_POINT } from "@/utils/constant";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [input, setInput] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${ADMIN_API_END_POINT}/login`,
//         input,
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/admin/dashboard");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white border border-gray-100 shadow-sm rounded-2xl p-8">

//         {/* Header */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-4">
//             <ShieldCheck className="text-indigo-600" size={28} />
//           </div>
//           <h1 className="text-xl font-semibold text-gray-900">Admin Login</h1>
//           <p className="text-sm text-gray-400 mt-1 text-center">
//             Access Uplift Career admin panel
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={input.email}
//               onChange={handleChange}
//               placeholder="admin@upliftcareer.com"
//               className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full"
//               required
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-medium text-gray-600">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={input.password}
//               onChange={handleChange}
//               placeholder="Enter password"
//               className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-semibold flex justify-center items-center gap-2 transition disabled:opacity-60 mt-1"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin" size={16} />
//                 Logging in...
//               </>
//             ) : (
//               "Login to Admin Panel"
//             )}
//           </button>

//         </form>

//         {/* Back link */}
//         <p
//           onClick={() => navigate('/')}
//           className="text-xs text-center text-gray-400 mt-5 cursor-pointer hover:text-gray-600"
//         >
//           ← Back to home
//         </p>

//       </div>
//     </div>
//   );
// };

// export default AdminLogin;