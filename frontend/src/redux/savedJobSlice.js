import { createSlice } from "@reduxjs/toolkit";

const savedJobSlice = createSlice({
  name: "savedJob",
  initialState: {
    savedJobs: [],
    savedInternships: [],
  },
  reducers: {
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    setSavedInternships: (state, action) => {
      state.savedInternships = action.payload;
    },
    toggleSavedJob: (state, action) => {
      const job = action.payload;
      const exists = state.savedJobs.find((j) => j._id === job._id);
      if (exists) {
        state.savedJobs = state.savedJobs.filter((j) => j._id !== job._id);
      } else {
        state.savedJobs.push(job);
      }
    },
    toggleSavedInternship: (state, action) => {
      const internship = action.payload;
      const exists = state.savedInternships.find((i) => i._id === internship._id);
      if (exists) {
        state.savedInternships = state.savedInternships.filter((i) => i._id !== internship._id);
      } else {
        state.savedInternships.push(internship);
      }
    },
  },
});

export const { setSavedJobs, setSavedInternships, toggleSavedJob, toggleSavedInternship } = savedJobSlice.actions;
export default savedJobSlice.reducer;