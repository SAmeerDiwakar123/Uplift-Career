import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    filters: {
      location: [],   
      jobType: [],     
      experience: [],  
      salary: [],      
      industry: []      
    }
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload
    },
    markJobApplied: (state, action) => {
      const { jobId, userId } = action.payload;

      const job = state.alljobs.find((j) => j._id === jobId);
      if (job) {
        if (!job.applications) job.applications = [];
        const alreadyThere = job.applications.some((app) => app.applicant === userId);
        if (!alreadyThere) {
          job.applications.push({ applicant: userId });
        }
      }

      if (state.singleJob?._id === jobId) {
        if (!state.singleJob.applications) state.singleJob.applications = [];
        const alreadyThere = state.singleJob.applications.some((app) => app.applicant === userId);
        if (!alreadyThere) {
          state.singleJob.applications.push({ applicant: userId });
        }
      }
    },
    setFilters: (state, action) => {
      // 🔥 Ensure values are arrays
      const newFilters = action.payload;
      state.filters = {
        location: Array.isArray(newFilters.location) ? newFilters.location : [],
        jobType: Array.isArray(newFilters.jobType) ? newFilters.jobType : [],
        experience: Array.isArray(newFilters.experience) ? newFilters.experience : [],
        salary: Array.isArray(newFilters.salary) ? newFilters.salary : [],
        industry: Array.isArray(newFilters.industry) ? newFilters.industry : []
      };
    },
    clearFilter: (state) => {
      state.filters = {
        location: [],
        jobType: [],
        experience: [],
        salary: [],
        industry: []
      }
    }
  }
});

export const { 
  setAllJobs, 
  setSingleJob, 
  setSearchJobByText, 
  setAllAppliedJobs, 
  markJobApplied, 
  setFilters, 
  clearFilter 
} = jobSlice.actions;

export default jobSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";


// const jobSlice = createSlice({
//   name: "job",
//   initialState: {
//     alljobs: [],
//     singleJob: null,
//     searchJobByText: "",
//     allAppliedJobs: [],
//     filters: {
//       location: "",
//       jobType: "",
//       experience: "",
//       salary: "",
//       industry: ""
//     }
//   },
//   reducers: {
//     setAllJobs: (state, action) => {
//       state.alljobs = action.payload;
//     },
//     setSingleJob: (state, action) => {
//       state.singleJob = action.payload;
//     },
//     setSearchJobByText: (state, action) => {
//       state.searchJobByText = action.payload;
//     },
//     setAllAppliedJobs: (state, action) => {
//       state.allAppliedJobs = action.payload
//     },
//     markJobApplied: (state, action) => {
//       const { jobId, userId } = action.payload;

//       // Update the job inside the alljobs list (used by JobCard)
//       const job = state.alljobs.find((j) => j._id === jobId);
//       if (job) {
//         if (!job.applications) job.applications = [];
//         const alreadyThere = job.applications.some((app) => app.applicant === userId);
//         if (!alreadyThere) {
//           job.applications.push({ applicant: userId });
//         }
//       }

//       // Also update singleJob if it's the same job (used by JobDetail)
//       if (state.singleJob?._id === jobId) {
//         if (!state.singleJob.applications) state.singleJob.applications = [];
//         const alreadyThere = state.singleJob.applications.some((app) => app.applicant === userId);
//         if (!alreadyThere) {
//           state.singleJob.applications.push({ applicant: userId });
//         }
//       }
//     },
//     setFilters: (state, action) => {
//       state.filters = {
//         ...state.filters,
//         ...action.payload
//       };
//     },
//     clearFilter: (state) => {
//       state.filters = {
//         location: "",
//         jobType: "",
//         experience: "",
//         salary: "",
//         industry: ""
//       }
//     }
//   }
// });
// export const { setAllJobs, setSingleJob, setSearchJobByText, setAllAppliedJobs, markJobApplied, setFilters, clearFilter } = jobSlice.actions;
// export default jobSlice.reducer;