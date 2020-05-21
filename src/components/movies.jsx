import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listgroup";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { column: "title", order: "asc" },
  };
  async componentDidMount() {
    let genres = [];
    let movies = [];
    try {
      const { data } = await getGenres();
      genres = [{ _id: "", name: "All Genres" }, ...data];
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        genres = [{ _id: "", name: "No Records Found" }];
        toast("No Genres Found");
      }
    }
    try {
      const { data } = await getMovies();
      movies = data;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast("No Movies Found");
      }
    }
    this.setState({
      movies: movies,
      genres: genres,
      selectedGenre: genres[0],
    });
  }
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast("Record Already Deleted");
      this.setState({ movies: originalMovies });
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;
    /* We should always filter data based on filteration, then sort that data and then Paginate that data */
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    /* if (count === 0) return <p>There are no movies in the database.</p>; */
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
              textProperty="name"
              valueProperty="_id"
            />
          </div>
          <div className="col">
            <div className="col">
              <div className="row">
                <Link
                  to="/movies/new"
                  className="btn btn-primary"
                  style={{ marginBottom: 20 }}
                >
                  New Movie
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="row">
                {count > 0 ? (
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col">
              <div className="row">
                {count > 0 ? (
                  <MoviesTable
                    movies={movies}
                    uniqueKey={"_id"}
                    sortColumn={sortColumn}
                    onDelete={this.handleDelete}
                    onLike={this.handleLike}
                    onSort={this.handleSort}
                  />
                ) : (
                  ""
                )}
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={this.handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
