import http from "./http-service";

const api = config.api;

export function getGenres() {
  return http.get("/genres");
}

export function getGenre(id) {
  return http.get("/genres/" + id);
}
