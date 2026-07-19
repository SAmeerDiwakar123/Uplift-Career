import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    singleCourse: null,
    myEnrollments: [],
    loading: false,
    searchCourseByText: "",
    filters: {},
  },

  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setSingleCourse: (state, action) => {
      state.singleCourse = action.payload;
    },
    setMyEnrollments: (state, action) => {
      state.myEnrollments = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchCourseByText: (state, action) => {
      state.searchCourseByText = action.payload;
    },
    setCourseFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCourseFilters: (state) => {
      state.filters = {};
    },
  },
});

export const { setCourses, setSearchCourseByText , setSingleCourse, setMyEnrollments, setLoading, setCourseFilters, clearCourseFilters, } = courseSlice.actions;
export default courseSlice.reducer;