import React from "react";
import Joi from "joi-browser";
import { toast, ToastContainer } from "react-toastify";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };
  async populateGenres() {
    let genres = [];
    try {
      const { data } = await getGenres();
      genres = [{ _id: "", name: "Select a Genre" }, ...data];
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        genres = [{ _id: "", name: "No Records Found" }];
        toast("No Genres Found");
      }
    }
    this.setState({ genres });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);

      if (movie) this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }
  doSubmit = async () => {
    await saveMovie(this.state.data);
    //Navigate to /movies
    this.props.history.push("/movies");
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <h2>Movie Form</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock", "Number in Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {this.renderSubmitButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieForm;
