import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { toast, ToastContainer } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { emailId: "", password: "" },
    errors: {},
    /* errors: {
      emailId: "Email ID Required and must be valid Email",
      password: "Password is Required",
    }, */
  };
  schema = {
    emailId: Joi.string().min(5).max(256).required().email().label("Email ID"),
    password: Joi.string().min(5).max(128).required().label("Password"),
  };
  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
      toast("Thanks for identifying yourself. Enjoy!.");
      // this.props.history.push("/"); this will simply reload the home page
      //and will not re-load it fully which will cause navbar to not render logged in user details
      //hence we need to do full reload of home page by saying window.location = "/"
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
        const errors = { ...this.state.errors };
        errors.emailId = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <form onSubmit={this.handleSubmit}>
            {/* "We'll never share your email with anyone else." */}
            {this.renderInput("emailId", "Email ID")}
            {this.renderInput("password", "Password", "password")}
            {this.renderSubmitButton("Login")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
