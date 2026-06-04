import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section className='bg-indigo-900 text-white py-24'>
      <div className='max-w-6xl mx-auto px-4 text-center'>

        <span className="text-xs bg-white/10 text-indigo-200 px-4 py-1.5 rounded-full font-medium">
          🚀 10,000+ Jobs Available
        </span>

        <h1 className='text-4xl md:text-6xl font-bold mt-6 mb-4 leading-tight'>
          Find your Dream Job <br />
          <span className='text-yellow-400'>Today</span>
        </h1>

        <p className='text-lg text-indigo-200 mb-10 max-w-xl mx-auto'>
          Discover 10,000+ job opportunities with top companies. Your next career move starts here.
        </p>

        {/* Search Bar */}
        <div className='bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-xl'>
          <div className="flex items-center gap-2 flex-1 px-3">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder='Job title, Keywords, or company'
              className='w-full py-3 text-gray-800 text-sm outline-none bg-transparent'
            />
          </div>

          <div className="hidden md:block w-px bg-gray-200 my-2" />

          <div className="flex items-center gap-2 flex-1 px-3">
            <MapPin size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="City, state, or pin code"
              className="w-full py-3 text-gray-800 text-sm outline-none bg-transparent"
            />
          </div>

          <button
            onClick={() => navigate('/jobs')}
            className="bg-indigo-600 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition whitespace-nowrap">
            Search Jobs
          </button>
        </div>

        {/* Popular Tags */}
        <div className='mt-5 flex flex-wrap justify-center gap-2 items-center'>
          <span className='text-sm text-indigo-300'>Popular:</span>
          {["Remote", "MNC", "Engineering", "MBA", "Fresher", "Data Science"].map((tag) => (
            <button key={tag} className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-sm hover:bg-white hover:text-indigo-800 transition">
              {tag}
            </button>
          ))}
        </div>

      </div>

      {/* Stats */}
      <div className='mt-16 max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
        {[
          { number: '12,458+', label: 'Live Jobs' },
          { number: '3,576+', label: 'Companies' },
          { number: '1.2M+', label: 'Job Seekers' },
          { number: '8,500+', label: 'Daily Offers' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/10 rounded-2xl px-4 py-5 border border-white/10">
            <h2 className='text-2xl font-bold'>{stat.number}</h2>
            <p className='text-indigo-300 text-sm mt-1'>{stat.label}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Hero;






// import React from "react";

// const Hero = () => {

//   return (
//     <>
//       <div>
//         <section className='bg-indigo-900 text-white py-24'>
//           <div className='max-w-6xl mx-auto px-4 text-center'>
//             <h1 className='text-4xl md:text-6xl font-bold mb-4'>
//               Find your Dream Job <br />
//               <span className='text-yellow-400'>Today</span>
//             </h1>
//             <p className='text-lg text-gray-200 mb-8'>
//               Discover 10,000+ job opportunities with top companies. Your next career move starts here.
//             </p>

//             <div className='bg-white p-4 rounded-xl flex flex-col md:flex-row gap-4'>
//               <input type="text"
//                 placeholder='Job title, Keywords, or company'
//                 className='flex-1 px-4 py-3 text-black rounded-lg border'
//               />

//               <input
//                 type="text"
//                 placeholder="City, state, or pin code"
//                 className="flex-1 px-4 py-3 text-black rounded-lg border"
//               />

//               <button className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
//                 Search Jobs
//               </button>
//             </div>
//             <div className='mt-4 flex flex-wrap justify-center gap-2'>
//               <span className='text-sm text-gray-300'>Popular:</span>
//               {["Remote", "MNC", "Engineering", "MBA", "Fresher", "Data Science"].map((tag) => (
//                 <button key={tag} className="bg-white/10 px-3 py-1 rounded-full text-sm hover:bg-white hover:text-black transition">
//                   {tag}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
//             <div>
//               <h2 className='text-2xl font-bold'>12,458+</h2>
//               <p className='text-gray-300 text-sm'>Live Jobs</p>
//             </div>
//             <div>
//               <h2 className='text-2xl font-bold'>3,576+</h2>
//               <p className='text-gray-300 text-sm'>Companies</p>
//             </div>
//             <div>
//               <h2 className='text-2xl font-bold'>1.2M+</h2>
//               <p className='text-gray-300 text-sm'>Job Seekers</p>
//             </div>
//             <div>
//               <h2 className='text-2xl font-bold'>8,500+</h2>
//               <p className='text-gray-300 text-sm'>Daily Offers</p>
//             </div>
//             <div>
//               <h2></h2>
//               <p></p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   )
// }

// export default Hero;