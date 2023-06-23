import {
  addStudentFailure,
  addStudentSuccess,
  deleteStudentFailure,
  deleteStudentSuccess,
  getStudentListFailure,
  getStudentListSuccess,
} from "../Redux/Slice/StudentSlice";
import { api } from "./Index";

export const getStudentList = () => async (dispatch) => {
  try {
    const response = await api.get("/api/v1/students");
    dispatch(getStudentListSuccess(response.data.data));
  } catch (error) {
    dispatch(getStudentListFailure(error.message));
  }
};

export const addStudent = (data) => async (dispatch) => {
  try {
    const response = await api.post("/api/v1/students", data);
    dispatch(addStudentSuccess(response.data.data));
  } catch (error) {
    dispatch(addStudentFailure(error.response.status));
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/v1/student/${id}`);
    dispatch(deleteStudentSuccess(id));
  } catch (error) {
    dispatch(deleteStudentFailure(error.message));
  }
};
