import config from "../config.json";
import http from "../services/httpService";
import logger from "../services/loggingService";

logger.init();

const api = config.api;

let genres = null;

export async function getGenres() {
  if (genres === null) {
    const promise = http.get(api + "genres");
    const { data } = await promise;
    if (!data) {
      logger.logException("genres not loaded");
    } else {
      genres = [...data];
    }
  }
  return genres;
}

export async function getGenre(id) {
  if (genres === null) {
    genres = await getGenres();
  }
  return genres.find(g => g._id === id);
}
