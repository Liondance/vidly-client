import config from "../config.json";
import http from "./http-service";

const api = config.api + "users";

export function registerUser(user) {
  let userInDb = {
    name: user.name,
    email: user.username,
    password: user.password
  };

  return http.post(api, userInDb);
}
