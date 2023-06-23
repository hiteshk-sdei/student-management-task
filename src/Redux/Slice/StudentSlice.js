import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: [],
  message: null,
  error: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    getStudentListSuccess: (state, action) => {
      state.studentList = action.payload;
    },
    getStudentListFailure: (state, action) => {
      state.error = action.payload;
    },
    addStudentSuccess: (state, action) => {
      state.studentList.push(action.payload);
      state.message = "Student has been created successfully.";
    },
    addStudentFailure: (state, action) => {
      if (action.payload === 400) {
        state.error = "Student already present.";
      }
    },
    deleteStudentSuccess: (state, action) => {
      state.studentList.splice(action.payload, 1);
      state.message = "Student has been deleted successfully.";
    },
    deleteStudentFailure: (state, action) => {
      state.error = action.payload;
    },
    resetStudent: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
});

export const {
  addStudentSuccess,
  addStudentFailure,
  getStudentListSuccess,
  getStudentListFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
  resetStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
