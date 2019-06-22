import axios from "axios";
import { toast } from "react-toastify";

function onRejected(error) {
  const status = error.response ? error.response.status : 0;
  const expected = 400 <= status && status < 500;
  if (!expected) {
    toast.error(`Unexpected error: ${error}`);
  }
  Promise.reject(error);
}

axios.interceptors.request.use(null, onRejected);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
