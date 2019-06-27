import React, { Component } from "react";

import _ from "lodash";

import { getMovies, deleteMovie } from "../services/movie-service";

import { getGenres } from "../services/genre-service";
import { paginate } from "../utils/paginate";

import MoviesTable from "./movies-table";
import Pagination from "./pagination";
import Selector from "./selector";
import SearchBox from "./search-box";

import auth from "../services/auth-service";

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
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  async toggle(movie) {
    movie.loved = !movie.loved;
    this.setState({ movies: this.state.movies });
  }

  async remove(movie) {
    await deleteMovie(movie._id);
    const { data: movies } = await getMovies();
    this.setState({ movies });
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

  getMoviesByGenre(genre, movies) {
    if (genre === null) return movies;
    return movies.filter(m => m.genre._id === genre._id);
  }

  getMoviesByMatch(pattern, movies) {
    return movies.filter(
      m =>
        pattern.toLowerCase() ===
        m.title.substr(0, pattern.length).toLowerCase()
    );
  }

  getPagedData({
    movies,
    sortColumn,
    searchPattern,
    selectedGenre,
    currentPage,
    pageSize
  }) {
    const selected =
      searchPattern !== ""
        ? this.getMoviesByMatch(searchPattern, movies)
        : this.getMoviesByGenre(selectedGenre, movies);
    const count = selected.length;
    const sorted = _.orderBy(selected, [sortColumn.path], [sortColumn.order]);
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

    const user = this.props.user;

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
          {user && user.email === "admin@west.org" && this.newButton()}
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
