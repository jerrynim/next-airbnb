import Axios, { AxiosError } from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err: AxiosError) => {
    return Promise.reject(err.response);
  }
);
export default axios;
