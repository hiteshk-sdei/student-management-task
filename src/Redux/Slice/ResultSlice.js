import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultList: [],
  message: null,
  error: null,
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    getResultListSuccess: (state, action) => {
      state.resultList = action.payload;
    },
    getResultListFailure: (state, action) => {
      state.error = action.payload;
    },
    addResultSuccess: (state, action) => {
      state.resultList.push(action.payload);
      state.message = "Result has been created successfully.";
    },
    addResultFailure: (state, action) => {
      if (action.payload === 400) {
        state.error = "Result already present.";
      }
    },
    deleteResultSuccess: (state, action) => {
      state.resultList.splice(action.payload, 1);
      state.message = "Result has been deleted successfully.";
    },
    deleteResultFailure: (state, action) => {
      state.error = action.payload;
    },
    resetResult: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
});

export const {
  getResultListSuccess,
  getResultListFailure,
  addResultSuccess,
  addResultFailure,
  deleteResultSuccess,
  deleteResultFailure,
  resetResult,
} = resultSlice.actions;

export default resultSlice.reducer;
