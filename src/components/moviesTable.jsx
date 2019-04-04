import React, { Component } from "react";
import Loved from "./loved";
import Table from "./table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
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
      content: movie => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.remove(movie)}
        >
          delete
        </button>
      )
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
