import axios from "axios";
// Development
// export const API = axios.create({
//   baseURL: "http://10.1.177.123:8000/api",
//   //   withCredentials: true,
//   //   credentials: "include",
// });
// export const LOGIN = axios.create({
//   baseURL: "http://10.1.177.123:8000",
//   //   withCredentials: true,
//   //   credentials: "include",
// });

// Production;
export const API = axios.create({
  baseURL: "http://10.2.125.121:8000/api",
  //   withCredentials: true,
  //   credentials: "include",
});
export const LOGIN = axios.create({
  baseURL: "http://10.2.125.121:8000",
});
