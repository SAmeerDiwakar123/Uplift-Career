import { createSlice } from "@reduxjs/toolkit";

const internshipSlice = createSlice({
  name: "internship",
  initialState: {
    allInternships: [],
    singleInternship: null,
    myInternships: [],          // recruiter ke khud ke posts
    myApplications: [],         // student ke applications
    searchInternshipByText: "",
    filterInternships: [],
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
  },
});

export const {
  setAllInternships,
  setSingleInternship,
  setMyInternships,
  setMyApplications,
  setSearchInternshipByText,
  setFilterInternships,
} = internshipSlice.actions;

export default internshipSlice.reducer;