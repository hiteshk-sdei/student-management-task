import axios from "axios";

export const api = axios.create({
  baseURL: "https://student-demo-app-b04474eab0dd.herokuapp.com",
});
