import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

//Globally handling all UNEXPECTED ERRORS
//here success and error are funcstions
//Generally there is no need to intercept success responses
//however if the application demands a log of all success calls
//axios.interceptors.response.use(success, error);
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred." + error);
  }
  return Promise.reject(error); //this line will pass control to main called funxtion which invoked axios call
});
function setToken(token) {
  axios.defaults.headers.common["x-auth-token"] = token;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken: setToken,
};
