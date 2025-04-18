import axios, { AxiosInstance } from "axios";
import productRequest from "./routes/product";
import userRequest from "./routes/user";
import orderRequest from "./routes/order.";
import sellRequest from "./routes/sell";
import uploadImgRequest from "./routes/uploadImg";

const baseURL = `${new URL(import.meta.env.VITE_API_URL).origin}/api`;
let token = localStorage.getItem("token");
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const sell = sellRequest(axiosInstance, baseURL);
const order = orderRequest(axiosInstance, baseURL);
const product = productRequest(axiosInstance, baseURL);
const user = userRequest(axiosInstance, baseURL);
const uploadImg = uploadImgRequest(axiosInstance, baseURL);

export const updateToken = (newToken: string) => {
  token = newToken;
  localStorage.setItem("token", newToken);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
};

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default { product, user, order, sell, uploadImg };
