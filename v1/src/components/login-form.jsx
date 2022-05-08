import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../services/auth-service";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("User name"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  componentDidMount() {
    localStorage.removeItem("token");
  }

  async doSubmit(data) {
    try {
      const { username: email, password } = this.state.data;
      await auth.login(email, password);
      // force a complete window reload
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "username", "User name")}
          {this.renderInput("password", "password", "Password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
