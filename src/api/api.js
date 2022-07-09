import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });
const currentPath = history.location.pathname;

const api = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let status = error.response.status;

    if ((status === 401 || status === 419) && currentPath !== "/") {
      localStorage.setItem("isAuth", false);
      history.push("/");
    }
    return Promise.reject(error);
  }
);

export default api;
