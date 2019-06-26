import config from "../config.json";
import jwtDecode from "jwt-decode";
import http from "./http-service";

const api_auth = config.api + "auth";
const api_user = config.api + "users";

const tokenKey = "token";

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(jwt);
}

// exports

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = getJwt();
    if (!jwt) {
      return null;
    }
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

async function registerUser(user) {
  const { headers } = await http.post(api_user, user);
  const jwt = headers["x-auth-token"];
  loginWithJwt(jwt);
}

async function login(email, password) {
  const { data: jwt } = await http.post(api_auth, { email, password });
  loginWithJwt(jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  getJwt,
  getCurrentUser,
  registerUser,
  login,
  logout
};
