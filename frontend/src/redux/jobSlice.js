import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    filters: {
      location: "",
      jobType: "",
      experience: "",
      salary: "",
      industry: ""
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
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    clearFilter: (state) => {
      state.filters = {
        location: "",
        jobType: "",
        experience: "",
        salary: "",
        industry: ""
      }
    }
  }
});
export const { setAllJobs, setSingleJob, setSearchJobByText, setAllAppliedJobs, setFilters, clearFilter } = jobSlice.actions;
export default jobSlice.reducer;