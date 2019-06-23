import config from "../config.json";
import http from "../services/httpService";

const api = config.api;

let movies = [];

export function getMovies() {
  return http.get(api + "movies/");
}

export function getMovie(id) {
  return http.get(api + "movies/" + id);
}

export async function saveMovie(movie) {
  let movieInDb = {};
  movieInDb.title = movie.title;
  movieInDb.genreId = movie.genreId;
  movieInDb.numberInStock = Number(movie.numberInStock);
  movieInDb.dailyRentalRate = Number(movie.dailyRentalRate);

  const update = movie._id !== "new";

  if (update) {
    return http.put(api + "movies/" + movie._id, movieInDb);
  } else {
    return http.post(api + "movies/", movieInDb);
  }
}

export async function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  movieInDb = await http.delete(api + "movies/", id);
  return movieInDb;
}

async function loadMovies() {
  const promise = http.get(api + "movies");
  const { data } = await promise;
  return data;
}

movies = loadMovies();
