import http from "../services/http-service";

const api = "/movies/";

export function getMovies() {
  return http.get(api);
}

export function getMovie(id) {
  return http.get(api + id);
}

export function saveMovie(movie) {
  let movieInDb = {};
  movieInDb.title = movie.title;
  movieInDb.genreId = movie.genreId;
  movieInDb.numberInStock = Number(movie.numberInStock);
  movieInDb.dailyRentalRate = Number(movie.dailyRentalRate);

  const update = movie._id !== "new";

  if (update) {
    return http.put(api + movie._id, movieInDb);
  } else {
    return http.post(api, movieInDb);
  }
}

export function deleteMovie(id) {
  // let movieInDb = movies.find(m => m._id === id);
  // movies.splice(movies.indexOf(movieInDb), 1);
  return http.delete(api, id);
}
