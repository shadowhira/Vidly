import React, { Component } from "react";
import Heart from "./common/heart";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Heart onLiked={() => this.props.onLiked(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => {
        const user = auth.getCurrentUser();
        if (!user || !user.isAdmin)
          return null;
        return (
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        );
      },
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
