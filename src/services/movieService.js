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
  let movieInDb = (await getMovie(movie._id)) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = await genresAPI.getGenre(movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }
}

export async function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}

export function getMoviesByGenre(genre) {
  if (genre === null) return movies;
  return movies.filter(m => m.genre._id === genre._id);
}

export function getMoviesByMatch(pattern) {
  return movies.filter(
    m =>
      pattern.toLowerCase() === m.title.substr(0, pattern.length).toLowerCase()
  );
}

export function logMovie(movie) {
  console.log(`_id: ${movie._id}`);
  console.log(`title: ${movie.title}`);
  console.log(`genre._id: ${movie.genre._id}`);
  console.log(`genre.name: ${movie.genre.name}`);
  console.log(`numberInStock: ${movie.numberInStock}`);
  console.log(`dailyRentalRate: ${movie.dailyRentalRate}`);
}
