import config from "../config.json";
import http from "./http-service";

const api = config.api + "auth";

export function login(email, password) {
  return http.post(api, { email, password });
}
