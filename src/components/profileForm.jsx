import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Form from "./common/form";
import { updateProfile } from "../services/userService";
import auth from "../services/authService";
class ProfileForm extends Form {
  state = {
    data: { email: "", name: "" },
    user: {},
    errors: {},
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    if (!user) this.props.history.replace("/not-found");
    this.setState({ data: { email: user.email, name: user.name } });
    this.setState({ user: user });
  }
  schema = {
    email: Joi.string().min(5).max(256).required().email().label("Email ID"),
    name: Joi.string().min(5).max(128).required().label("Full Name"),
  };

  handleChangePassword = () => {
    this.props.history.push("/changePassword");
  };
  doSubmit = async () => {
    const user = {
      ...this.state.data,
    };
    try {
      const response = await updateProfile(user);
      auth.loginWithToken(response.headers["x-auth-token"]);
      toast("Redirecting to home page...please wait...");
      //this.props.history.push("/");
      // this.props.history.push("/"); this will simply reload the home page
      //and will not re-load it fully which will cause navbar to not render logged in user details
      //hence we need to do full reload of home page by saying window.location = "/"
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email ID")}
            {this.renderInput("name", "Full Name")}
            {this.renderSubmitButton("Submit")}
            <Link
              className="btn btn-primary btn-warning m-4"
              to="/changePassword"
            >
              Change Password
            </Link>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileForm;
