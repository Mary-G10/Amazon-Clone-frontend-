import axios from "axios";
export const productUrl = "https://fakestoreapi.com";
const axiosInstance = axios.create({
  // local instance of firebase funtions
  // baseURL: "http://127.0.0.1:5001/clone-66248/us-central1/api",
  // deployed version of amazon server on render.com
  baseURL:"https://amazon-api-deploy-rzmi.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
  timeout: 30000,
});

export { axiosInstance };

