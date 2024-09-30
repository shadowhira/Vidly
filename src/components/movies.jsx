import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import MovieForm from "./movieForm";
import SearchBar from "./common/searchBar";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4, // number of movies per page
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: "All Genres",
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: moviesData } = await getMovies();
    const movies = moviesData.map((movie) => ({ ...movie, liked: false }));
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = async (id) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== id);
    this.setState({ movies });

    try {
      await deleteMovie(id);
      toast.success("Movie deleted successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre !== "All Genres")
      filtered = selectedGenre ? allMovies.filter((m) => m.genre.name === selectedGenre) : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: movies } = this.getPagedData();
    const { user } = this.props;

    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
          {false && (
            <MovieForm data={this.state.movies} addMovie={this.addMovie} />
          )}
          <div className="m-4">
            {user && (
              <Link to="/movies/new">
                <button
                  style={{ marginTop: "-35px" }}
                  className="btn btn-primary"
                >
                  New Movie
                </button>
              </Link>
            )}
            <p style={{ marginTop: "20px" }}>
              There are {totalCount === 0 ? "no" : totalCount} movies
            </p>
            <SearchBar value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLiked={this.handleLiked}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
