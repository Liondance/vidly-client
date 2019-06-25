import config from "../config.json";
import http from "./http-service";

const api = config.api + "auth";

async function login(email, password) {
  const { data: jwt } = await http.post(api, { email, password });
  localStorage.setItem("token", jwt);
}

function logout(email, password) {
  localStorage.removeItem("token");
}

export default { login, logout };
