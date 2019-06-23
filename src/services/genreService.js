import config from "../config.json";
import http from "../services/httpService";

const api = config.api;

export function getGenres() {
  return http.get(api + "genres");
}

export function getGenre(id) {
  return http.get(api + "genres/" + id);
}
