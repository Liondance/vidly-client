import React from "react";
import Joi from "joi-browser";
import Form from "./form";

import { getGenres } from "../services/fakeGenreService";

class NewMovieForm extends Form {
  state = {
    data: { title: "", genre: "", stock: "", rate: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    stock: Joi.number()
      .required()
      .integer()
      .min(0)
      .label("Number in Stock"),
    rate: Joi.number()
      .required()
      .min(0)
      .max(5)
      .label("Rate")
  };

  doSubmit(data) {
    console.log(`submitted:`);
    console.log(`${data.title}`);
    console.log(`${data.genre}`);
    console.log(`${data.stock}`);
    console.log(`${data.rate}`);
  }

  renderInputList = (type, name, label, list) => {
    const { data, errors } = this.state;
    const error = errors ? errors[name] : {};

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          type={type}
          name={name}
          value={data[name]}
          onChange={this.handleChange}
          className="form-control"
        >
          <option key="?" value="">
            Select ...
          </option>
          {list.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  };

  merdex() {}

  render() {
    const genres = getGenres().map(g => g.name);
    return (
      <div>
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("text", "title", "Title")}
          {this.renderInputList("text", "genre", "Genre", genres)}
          {this.renderInput("text", "stock", "Number in Stock")}
          {this.renderInput("text", "rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
