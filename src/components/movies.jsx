import React, { Component } from "react";

import _ from "lodash";

import {
  getMovies,
  getMoviesByGenre,
  getMoviesByMatch,
  deleteMovie
} from "../services/fakeMovieService";

import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import Selector from "./selector";
import SearchBox from "./search-box";

export default class Main extends Component {
  state = {
    movies: [],
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    searchPattern: "",
    selectedGenre: null,
    currentPage: 1,
    pageSize: 4
  };

  handleNew(props) {
    props.history.push("/movies/new");
  }

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ movies: getMovies(), genres });
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

  updateSearch(searchPattern) {
    this.setState({ searchPattern: searchPattern, selectedGenre: null });
  }

  handlePageSelection(page) {
    this.setState({ currentPage: page });
  }

  handleGenreSelection(genre) {
    this.setState({ searchPattern: "", selectedGenre: genre, currentPage: 1 });
  }

  getPagedData({
    sortColumn,
    searchPattern,
    selectedGenre,
    currentPage,
    pageSize
  }) {
    const movies =
      searchPattern !== ""
        ? getMoviesByMatch(searchPattern)
        : getMoviesByGenre(selectedGenre);
    const count = movies.length;
    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);
    const view = paginate(sorted, currentPage, pageSize);
    return { count, view };
  }

  newButton() {
    return (
      <button
        className="btn btn-primary"
        onClick={() => this.handleNew(this.props)}
      >
        New Movie
      </button>
    );
  }

  render() {
    const {
      genres,
      sortColumn,
      selectedGenre,
      currentPage,
      pageSize
    } = this.state;

    const { count, view } = this.getPagedData(this.state);

    return (
      <div className="row">
        <div className="col-2">
          <Selector
            items={genres}
            selected={selectedGenre}
            select={this.handleGenreSelection.bind(this)}
          />
        </div>
        <div className="col">
          {this.newButton()}
          <SearchBox
            type="text"
            name="search"
            label="Search"
            value={this.state.searchPattern}
            error=""
            onChange={this.updateSearch.bind(this)}
          />
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
