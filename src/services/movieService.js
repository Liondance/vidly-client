import config from "../config.json";
import http from "../services/httpService";
import { getGenre } from "./genreService";

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
  const { data: genre } = await getGenre(movie.genreId);
  movieInDb.genre = genre;
  movieInDb.numberInStock = Number(movie.numberInStock);
  movieInDb.dailyRentalRate = Number(movie.dailyRentalRate);

  const update = movie._id !== "new";

  if (update) {
    console.log("updating: ");
    console.log(movie._id);
    console.log(movieInDb);
    return http.put(api + "movies/" + movie._id, movieInDb);
  } else {
    console.log("adding: ");
    console.log(movieInDb);
    return http.post(api + "movies/", movieInDb);
  }
}

export async function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  await http.delete(api + "movies/", id);
  return movieInDb;
}

async function loadMovies() {
  const promise = http.get(api + "movies");
  const { data } = await promise;
  return data;
}

movies = loadMovies();
