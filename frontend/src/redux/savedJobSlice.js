import { createSlice } from "@reduxjs/toolkit";

const savedJobSlice = createSlice({
  name: "savedJob",

  initialState: {
    savedJobs: [],
    savedInternships: [],
    searchInternshipByText: "",
  },

  reducers: {

    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload || [];
    },

    setSavedInternships: (state, action) => {
      state.savedInternships = action.payload || [];
    },


    toggleSavedJob: (state, action) => {

      state.savedJobs = state.savedJobs || [];

      const job = action.payload;

      const index = state.savedJobs.findIndex(
        (j)=> j._id?.toString() === job._id?.toString()
      );


      if(index !== -1){
        state.savedJobs.splice(index,1);
      }
      else{
        state.savedJobs.push(job);
      }

    },


    toggleSavedInternship: (state, action)=>{

      state.savedInternships = state.savedInternships || [];

      const internship = action.payload;


      const index = state.savedInternships.findIndex(
        (i)=> i._id?.toString() === internship._id?.toString()
      );


      if(index !== -1){
        state.savedInternships.splice(index,1);
      }
      else{
        state.savedInternships.push(internship);
      }

    }

  }
});


export const {
setSavedJobs,
setSavedInternships,
toggleSavedJob,
toggleSavedInternship

}=savedJobSlice.actions;


export default savedJobSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const savedJobSlice = createSlice({
//   name: "savedJob",
//   initialState: {
//     savedJobs: [],
//     savedInternships: [],
//   },
//   reducers: {
//     setSavedJobs: (state, action) => {
//       state.savedJobs = action.payload;
//     },
//     setSavedInternships: (state, action) => {
//       state.savedInternships = action.payload;
//     },
//     toggleSavedJob: (state, action) => {
//       const job = action.payload;
//       const index = state.savedJobs.findIndex(
//         (j) => j._id?.toString() === job._id?.toString()
//       );
//       if (index !== -1) {
//         state.savedJobs.splice(index, 1);
//       } else {
//         state.savedJobs.push(job);
//       }
//     },

//     toggleSavedInternship: (state, action) => {
//       const internship = action.payload;
//       const index = state.savedInternships.findIndex(
//         (i) => i._id?.toString() === internship._id?.toString()
//       );
//       if (index !== -1) {
//         state.savedInternships.splice(index, 1);
//       } else {
//         state.savedInternships.push(internship);
//       }
//     },
//   },
// });

// export const { setSavedJobs, setSavedInternships, toggleSavedJob, toggleSavedInternship } = savedJobSlice.actions;
// export default savedJobSlice.reducer;