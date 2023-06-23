import {
  addCourseFailure,
  addCourseSuccess,
  deleteCourseFailure,
  deleteCourseSuccess,
  getCourseListFailure,
  getCourseListSuccess,
} from "../Redux/Slice/CourseSlice";
import { api } from "./Index";

export const getCourseList = () => async (dispatch) => {
  try {
    const response = await api.get("/api/v1/course");
    dispatch(getCourseListSuccess(response.data.data));
  } catch (error) {
    dispatch(getCourseListFailure(error.message));
  }
};

export const addCourse = (data) => async (dispatch) => {
  try {
    const response = await api.post("/api/v1/course", data);
    dispatch(addCourseSuccess(response.data.data));
  } catch (error) {
    dispatch(addCourseFailure(error.response.status));
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/v1/course/${id}`);
    dispatch(deleteCourseSuccess(id));
  } catch (error) {
    dispatch(deleteCourseFailure(error.message));
  }
};
