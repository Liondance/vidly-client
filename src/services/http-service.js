import axios from "axios";
import logger from "./logging-service";
import { toast } from "react-toastify";

axios.interceptors.request.use(null, onRejected);

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

export default {
  setJwt,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
