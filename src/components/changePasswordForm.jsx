import React from "react";
import Joi from "joi-browser";
import { toast, ToastContainer } from "react-toastify";
import Form from "./common/form";
import auth from "../services/authService";
class ChangePasswordForm extends Form {
  state = {
    data: { currentPassword: "", password: "", rePassword: "" },
    errors: {},
  };
  schema = {
    currentPassword: Joi.string()
      .min(5)
      .max(128)
      .required()
      .label("Current Password"),
    password: Joi.string().min(5).max(128).required().label("Password"),
    rePassword: Joi.string()
      .required()
      .min(5)
      .max(128)
      .label("Re Enter Password"),
  };
  doSubmit = async () => {
    try {
      const data = { ...this.state.data };
      if (data.password === data.rePassword) {
        const response = await auth.changePassword(
          data.currentPassword,
          data.password,
          data.rePassword
        );
        auth.loginWithToken(response.headers["x-auth-token"]);
        toast("Redirecting to home page...please wait...");
        // this.props.history.push("/");
        // this.props.history.push("/"); this will simply reload the home page
        // and will not re-load it fully which will cause navbar to not render logged in user details
        // hence we need to do full reload of home page by saying window.location = "/"
        window.location = "/";
      } else {
        const errors = { ...this.state.errors };
        errors.password = "Password and Re Entered Passwords must match.";
        errors.rePassword = "Password and Re Entered Passwords must match.";
        this.setState({ errors: errors });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
        const errors = { ...this.state.errors };
        errors.currentPassword = ex.response.data;
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
            {this.renderInput(
              "currentPassword",
              "Current Password",
              "password"
            )}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("rePassword", "Re Enter Password", "password")}
            {this.renderSubmitButton("Submit")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangePasswordForm;
