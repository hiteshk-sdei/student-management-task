import {
  addResultFailure,
  addResultSuccess,
  deleteResultFailure,
  deleteResultSuccess,
  getResultListFailure,
  getResultListSuccess,
} from "../Redux/Slice/ResultSlice";
import { api } from "./Index";

export const getResultList = () => async (dispatch) => {
  try {
    const response = await api.get("/api/v1/results",{
      headers:{
        basicAuth: 1234
      }
    });
    dispatch(getResultListSuccess(response.data.data));
  } catch (error) {
    dispatch(getResultListFailure(error.message));
  }
};

export const addResult = (data) => async (dispatch) => {
  try {
    const response = await api.post("/api/v1/results", data,{
      headers:{
        basicAuth: 1234
      }
    });
    dispatch(addResultSuccess(response.data.data));
  } catch (error) {
    dispatch(addResultFailure(error.response.status));
  }
};

export const deleteResult = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/v1/result/${id}`,{
      headers:{
        basicAuth: 1234
      }
    });
    dispatch(deleteResultSuccess(id));
  } catch (error) {
    dispatch(deleteResultFailure(error.message));
  }
};
