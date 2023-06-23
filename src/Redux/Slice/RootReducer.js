import { combineReducers } from "@reduxjs/toolkit";
import CourseSlice from "./CourseSlice";
import ResultSlice from "./ResultSlice";
import StudentSlice from "./StudentSlice";

const RootReducer = combineReducers({
  result: ResultSlice,
  course: CourseSlice,
  student: StudentSlice,
});
export default RootReducer;
