import http from "./http-service";

export function getGenres() {
  return http.get("/genres");
}

export function getGenre(id) {
  return http.get("/genres/" + id);
}
