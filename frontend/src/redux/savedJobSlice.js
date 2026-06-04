import { createSlice } from "@reduxjs/toolkit";

const savedJobSlice = createSlice({
  name: "savedJob",
  initialState: {
    savedJobs: []
  },
  reducers: {
    toggleSavedJob: (state, action) => {
      if (!state.savedJobs) state.savedJobs = [];
      
      //Job exists
      const exists = state.savedJobs.find(job => job._id === action.payload._id);
      
      if (exists) {
        //remove
        state.savedJobs = state.savedJobs.filter(job => job._id !== action.payload._id);
      } else {
        //add
        state.savedJobs.push(action.payload);
      }
    }
  }
});

export const { toggleSavedJob } = savedJobSlice.actions;
export default savedJobSlice.reducer;