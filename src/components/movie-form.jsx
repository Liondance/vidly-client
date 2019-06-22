import React from "react";
import Joi from "joi-browser";
import Form from "./form";

import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
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
    this.state.data = newMovie;
    this.state.genres = [];
  }

  async componentDidMount() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") {
      this.setState({ data: { ...newMovie } });
    } else {
      const movie = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    }

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
    this.history.replace("/movies");
    await saveMovie(this.state.data);
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
