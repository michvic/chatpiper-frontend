import axios from "axios";
import { getToken } from "../service/auth";


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
  } catch (e) {
    console.log(e.message);
  }

  return config;
});

api.interceptors.response.use(async (config) => {
  try {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `${token}`;
    }
  } catch (e) {
    console.log(e.message);
  }
  return config;
});

export default api;
