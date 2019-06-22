import config from "../config.json";
import http from "../services/httpService";
import logger from "../services/loggingService";

import * as genresAPI from "./genreService";

logger.init();

const api = config.api;

let movies = null;

export async function getMovies() {
  if (movies === null) {
    const promise = http.get(api + "movies");
    const { data } = await promise;
    if (!data) {
      logger.logException("genres not loaded");
    } else {
      movies = [...data];
    }
  }
  return movies;
}

movies = getMovies();

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export async function saveMovie(movie) {
  let movieInDb = getMovie(movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = await genresAPI.getGenre(movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    const result = await http.post(api + "movies", movie);
    console.log("saveMovie", result);
    movies = getMovies();
  }
}

export async function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  await http.delete(api + "movies/", id);
  return movieInDb;
}

export function logMovie(movie) {
  console.log(`_id: ${movie._id}`);
  console.log(`title: ${movie.title}`);
  console.log(`genre._id: ${movie.genre._id}`);
  console.log(`genre.name: ${movie.genre.name}`);
  console.log(`numberInStock: ${movie.numberInStock}`);
  console.log(`dailyRentalRate: ${movie.dailyRentalRate}`);
}
