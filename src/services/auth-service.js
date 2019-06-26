import config from "../config.json";
import jwtDecode from "jwt-decode";
import http from "./http-service";

const api_auth = config.api + "auth";
const api_user = config.api + "users";

const tokenKey = "token";

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

async function registerUser(user) {
  const { headers } = await http.post(api_user, user);
  loginWithJwt(headers["x-auth-token"]);
}

async function login(email, password) {
  const { data: jwt } = await http.post(api_auth, { email, password });
  loginWithJwt(jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

export default { getCurrentUser, registerUser, loginWithJwt, login, logout };
