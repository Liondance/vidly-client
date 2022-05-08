import axios from "axios";
import logger from "./logging-service";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function setJwt(jwt) {
  if (jwt) {
    // configuring default headers
    // tell axios we want the JSON Web Token on each http requests
    axios.defaults.headers.common["x-auth-token"] = jwt;
  }
}

function onRejected(error) {
  const status = error.response ? error.response.status : 0;
  const expected = 400 <= status && status < 500;
  if (!expected) {
    const message = `Unexpected error: ${error}`;
    logger.logException(message);
    toast.error(message);
  }
  Promise.reject(error);
}

axios.interceptors.request.use(null, onRejected);

export default {
  setJwt,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
