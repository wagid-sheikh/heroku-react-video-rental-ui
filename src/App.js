import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import Movies from "./components/movies";
import Home from "./components/home";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import Dashboard from "./components/admin/dashboard";
import Customer from "./components/customers";
import Rentals from "./components/rentals";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import ProfileForm from "./components/profileForm";
import ChangePasswordForm from "./components/changePasswordForm";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container">
          <NavBar user={user} />
          <Switch>
            <ProtectedRoute
              path="/changePassword"
              component={ChangePasswordForm}
            />
            <ProtectedRoute path="/profile" component={ProfileForm} />
            {/* <ProtectedRoute path="/movies/new" exact component={MovieForm} /> */}
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <ProtectedRoute path="/movies" component={Movies} />
            <ProtectedRoute path="/customers/:id" component={Customer} />
            <ProtectedRoute path="/customers" component={Customer} />
            <ProtectedRoute path="/rentals/:id" component={Rentals} />
            <ProtectedRoute path="/rentals" component={Rentals} />
            <ProtectedRoute path="/admin" component={Dashboard} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/" exact component={Home}></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
