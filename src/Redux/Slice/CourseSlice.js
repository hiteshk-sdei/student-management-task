import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  message: null,
  error: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    getCourseListSuccess: (state, action) => {
      state.courseList = action.payload;
    },
    getCourseListFailure: (state, action) => {
      state.error = action.payload;
    },
    addCourseSuccess: (state, action) => {
      state.courseList.push(action.payload);
      state.message = "Course has been created successfully.";
    },
    addCourseFailure: (state, action) => {
      if (action.payload === 400) {
        state.error = "Course already present.";
      }
    },
    deleteCourseSuccess: (state, action) => {
      state.courseList.splice(action.payload, 1);
      state.message = "Course has been deleted successfully.";
    },
    deleteCourseFailure: (state, action) => {
      state.error = action.payload;
    },
    resetCourse: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
});

export const {
  getCourseListSuccess,
  getCourseListFailure,
  addCourseSuccess,
  addCourseFailure,
  deleteCourseSuccess,
  deleteCourseFailure,
  resetCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
