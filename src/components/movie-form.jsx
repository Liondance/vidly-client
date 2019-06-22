import React from "react";
import Joi from "joi-browser";
import Form from "./form";

import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import logger from "../services/loggingService";

logger.init();

const newMovie = {
  _id: "new",
  title: "",
  genreId: "",
  numberInStock: "",
  dailyRentalRate: ""
};

class MovieForm extends Form {
  constructor(props) {
    super(props);
    this.history = props.history;
    const movieId = props.match.params.id;
    if (movieId === "new") {
      this.state.data = { ...newMovie };
    } else {
      const movie = getMovie(movieId);
      if (!movie) {
        alert(`Movie Not Found!`);
        this.props.history.replace("/movies");
        return;
      }
      this.state.data = this.mapToViewModel(movie);
    }
    this.state.genres = [];
  }

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .integer()
      .min(0)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(5)
      .label("Rate")
  };

  async doSubmit() {
    await saveMovie(this.state.data);
    this.history.replace("/movies");
  }

  render() {
    return (
      <div>
        <h1>Movie</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="_id"
            value={this.state.data._id}
            readOnly
            hidden
            className="form-control"
          />
          {this.renderInput("text", "title", "Title")}
          {this.renderSelect(
            "text",
            "genreId",
            "Genre",
            this.state.genres,
            "_id",
            "name"
          )}
          {this.renderInput("text", "numberInStock", "Number in Stock")}
          {this.renderInput("text", "dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
