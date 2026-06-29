import { createSlice } from "@reduxjs/toolkit";

const internshipSlice = createSlice({
  name: "internship",
  initialState: {
    allInternships: [],
    singleInternship: null,
    searchInternshipByText: "",
    filterInternships: [],
    searchedQuery: {},
  },
  reducers: {
    setAllInternships: (state, action) => {
      state.allInternships = action.payload;
    },
    setSingleInternship: (state, action) => {
      state.singleInternship = action.payload
    },
    setSearchInternshipByText: (state, action) => {
      state.searchInternshipByText = action.payload;
    },
    setFilterInternships: (state, action) => {
      state.filterInternships = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllInternships,
  setSingleInternship,
  setSearchInternshipByText,
  setFilterInternships,
  setSearchedQuery,
} = internshipSlice.actions;

export default internshipSlice.reducer;












// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   allinternships: [],
//   singleinternship: null,
//   applications: [],
//   myInternships: [],
//   savedInternships: [],
//   loading: false,
//   error: null,
// };

// const internshipSlice = createSlice({
//   name: "internship",
//   initialState,

//   reducers: {
//     setAllInternships: (state, action) => {
//       state.allinternships = action.payload;
//     },

//     setSingleInternship: (state, action) => {
//       state.singleinternship = action.payload;
//     },

//     setApplications: (state, action) => {
//       state.applications = action.payload;
//     },

//     setMyInternships: (state, action) => {
//       state.myInternships = action.payload;
//     },

//     setSavedInternships: (state, action) => {
//       state.savedInternships = action.payload;
//     },

//     addApplication: (state, action) => {
//       state.applications.push(action.payload);
//     },

//     removeSavedInternship: (state, action) => {
//       state.savedInternships =
//         state.savedInternships.filter(
//           (item) => item.internship._id !== action.payload
//         );
//     },

//     clearInternship: (state) => {
//       state.singleinternship = null;
//       state.allinternships = [];
//       state.applications = [];
//       state.savedInternships = [];
//     },
//   },
// });

// export const {
//   setAllInternships,
//   setSingleInternship,
//   setApplications,
//   setMyInternships,
//   setSavedInternships,
//   addApplication,
//   removeSavedInternship,
//   clearInternship,
// } = internshipSlice.actions;

// export default internshipSlice.reducer;