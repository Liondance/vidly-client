import React, { Component } from "react";
import auth from "../services/auth-service";
import { Link } from "react-router-dom";
import Loved from "./loved";
import Table from "./table";

class MoviesTable extends Component {
  isAdmin() {
    const user = auth.getCurrentUser();
    return user !== null && user.email === "admin@west.org";
  }

  columns = [
    {
      key: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "liked",
      content: movie => (
        <Loved loved={movie.loved} toggle={() => this.props.toggle(movie)} />
      )
    },
    {
      key: "delete",
      content: movie =>
        this.isAdmin() ? (
          <button
            className="btn btn-danger"
            onClick={() => this.props.remove(movie)}
          >
            delete
          </button>
        ) : null
    }
  ];

  render() {
    const { movies, sortColumn, sort } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        sort={sort}
      />
    );
  }
}

export default MoviesTable;
