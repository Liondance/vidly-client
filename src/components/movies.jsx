import React, { Component } from "react";

import _ from "lodash";

import {
  getMovies,
  getMoviesByGenre,
  deleteMovie
} from "../services/fakeMovieService";

import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import Selector from "./selector";

export default class Main extends Component {
  state = {
    movies: [],
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    currentGenre: null,
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  toggle(movie) {
    movie.loved = !movie.loved;
    this.setState({ movies: this.state.movies });
  }

  remove(movie) {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  }

  sort(sortColumn) {
    this.setState({ currentPage: 1 });
    this.setState({ sortColumn });
  }

  handlePageSelection(page) {
    this.setState({ currentPage: page });
  }

  handleGenreSelection(genre) {
    this.setState({ currentGenre: genre, currentPage: 1 });
  }

  getPagedData({ sortColumn, currentGenre, currentPage, pageSize }) {
    const movies = getMoviesByGenre(currentGenre);
    const count = movies.length;
    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);
    const view = paginate(sorted, currentPage, pageSize);
    return { count, view };
  }

  render() {
    const {
      sortColumn,
      genres,
      currentGenre,
      currentPage,
      pageSize
    } = this.state;

    const { count, view } = this.getPagedData(this.state);

    return count === 0 ? (
      <p>No movies satisfy criteria.</p>
    ) : (
      <div className="row">
        <div className="col-2">
          <Selector
            items={genres}
            selected={currentGenre}
            select={this.handleGenreSelection.bind(this)}
          />
        </div>
        <div className="col">
          <p> {count} movies posted</p>
          <MoviesTable
            movies={view}
            sortColumn={sortColumn}
            toggle={this.toggle.bind(this)}
            remove={this.remove.bind(this)}
            sort={this.sort.bind(this)}
          />
          <Pagination
            listSize={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageSelection.bind(this)}
          />
        </div>
      </div>
    );
  }
}
