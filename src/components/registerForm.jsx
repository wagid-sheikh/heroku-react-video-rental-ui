import React from "react";
import Joi from "joi-browser";
import { toast, ToastContainer } from "react-toastify";
import Form from "./common/form";
import user from "../services/userService";
import auth from "../services/authService";
class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().min(5).max(256).required().email().label("Email ID"),
    password: Joi.string().min(5).max(128).required().label("Password"),
    name: Joi.string().min(5).max(128).required().label("Full Name"),
  };
  doSubmit = async () => {
    try {
      const response = await user.register(this.state.data);
      if (response.data)
        toast(
          "Congratulations. You have successfully registered yourself in our system."
        );
      toast("Redirecting to home page...please wait...");
      auth.loginWithToken(response.headers["x-auth-token"]);
      // this.props.history.push("/");
      // this.props.history.push("/"); this will simply reload the home page
      // and will not re-load it fully which will cause navbar to not render logged in user details
      // hence we need to do full reload of home page by saying window.location = "/"
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
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Full Name")}
            {this.renderSubmitButton("Register")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
