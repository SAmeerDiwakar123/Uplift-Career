import { createSlice } from "@reduxjs/toolkit";

const internshipSlice = createSlice({
  name: "internship",
  initialState: {
    allInternships: [],
    singleInternship: null,
    myInternships: [],
    myApplications: [],
    searchInternshipByText: "",
    filterInternships: [],
    filters: {
      location: [],
      profile: [],
      stipend: [],
      duration: [],
      mode: []
    },
  },
  reducers: {
    setAllInternships: (state, action) => {
      state.allInternships = action.payload;
    },
    setSingleInternship: (state, action) => {
      state.singleInternship = action.payload;
    },
    setMyInternships: (state, action) => {
      state.myInternships = action.payload;
    },
    setMyApplications: (state, action) => {
      state.myApplications = action.payload;
    },
    setSearchInternshipByText: (state, action) => {
      state.searchInternshipByText = action.payload;
    },
    setFilterInternships: (state, action) => {
      state.filterInternships = action.payload;
    },
    setFilters: (state, action) => {
      const newFilters = action.payload;
      state.filters = {
        location: Array.isArray(newFilters.location) ? newFilters.location : [],
        profile: Array.isArray(newFilters.profile) ? newFilters.profile : [],
        stipend: Array.isArray(newFilters.stipend) ? newFilters.stipend : [],
        duration: Array.isArray(newFilters.duration) ? newFilters.duration : [],
        mode: Array.isArray(newFilters.mode) ? newFilters.mode : []
      };
    },
    clearFilter: (state) => {
      state.filters = {
        location: [],
        profile: [],
        stipend: [],
        duration: [],
        mode: []
      };
    },
    markInternshipApplied: (state, action) => {
      const { internshipId, userId } = action.payload;

      const internship = state.allInternships.find((i) => i._id === internshipId);
      if (internship) {
        if (!internship.applications) internship.applications = [];
        const alreadyThere = internship.applications.some(
          (app) => app.applicant === userId
        );
        if (!alreadyThere) {
          internship.applications.push({ applicant: userId });
        }
      }

      if (state.singleInternship?._id === internshipId) {
        if (!state.singleInternship.applications) state.singleInternship.applications = [];
        const alreadyThere = state.singleInternship.applications.some(
          (app) => app.applicant === userId
        );
        if (!alreadyThere) {
          state.singleInternship.applications.push({ applicant: userId });
        }
      }
    },
  },
});

export const {
  setAllInternships,
  setSingleInternship,
  setMyInternships,
  setMyApplications,
  setSearchInternshipByText,
  setFilterInternships,
  setFilters,
  clearFilter,
  markInternshipApplied,
} = internshipSlice.actions;

export default internshipSlice.reducer;








// import { createSlice } from "@reduxjs/toolkit";

// const internshipSlice = createSlice({
//   name: "internship",
//   initialState: {
//     allInternships: [],
//     singleInternship: null,
//     myInternships: [],
//     myApplications: [],
//     searchInternshipByText: "",
//     filterInternships: [],
//     filters: {},
//   },
//   reducers: {
//     setAllInternships: (state, action) => {
//       state.allInternships = action.payload;
//     },
//     setSingleInternship: (state, action) => {
//       state.singleInternship = action.payload;
//     },
//     setMyInternships: (state, action) => {
//       state.myInternships = action.payload;
//     },
//     setMyApplications: (state, action) => {
//       state.myApplications = action.payload;
//     },
//     setSearchInternshipByText: (state, action) => {
//       state.searchInternshipByText = action.payload;
//     },
//     setFilterInternships: (state, action) => {
//       state.filterInternships = action.payload;
//     },
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     clearFilter: (state) => {
//       state.filters = {};
//     },
//     markInternshipApplied: (state, action) => {
//       const { internshipId, userId } = action.payload;

//       // Update inside allInternships list (used by InternshipCard)
//       const internship = state.allInternships.find((i) => i._id === internshipId);
//       if (internship) {
//         if (!internship.applications) internship.applications = [];
//         const alreadyThere = internship.applications.some(
//           (app) => app.applicant === userId
//         );
//         if (!alreadyThere) {
//           internship.applications.push({ applicant: userId });
//         }
//       }

//       // Also update singleInternship if it's the same one (used by InternshipDetail)
//       if (state.singleInternship?._id === internshipId) {
//         if (!state.singleInternship.applications) state.singleInternship.applications = [];
//         const alreadyThere = state.singleInternship.applications.some(
//           (app) => app.applicant === userId
//         );
//         if (!alreadyThere) {
//           state.singleInternship.applications.push({ applicant: userId });
//         }
//       }
//     },
//   },
// });

// export const {
//   setAllInternships,
//   setSingleInternship,
//   setMyInternships,
//   setMyApplications,
//   setSearchInternshipByText,
//   setFilterInternships,
//   setFilters,
//   clearFilter,
//   markInternshipApplied,
// } = internshipSlice.actions;

// export default internshipSlice.reducer;