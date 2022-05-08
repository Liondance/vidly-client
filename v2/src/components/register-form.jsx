import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { registerUser } from "../services/user-service";

class RegisterForm extends Form {
  state = {
    data: { name: "", username: "", password: "" },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .alphanum()
      .label("Name"),
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password")
  };

  async doSubmit() {
    try {
      await registerUser(this.state.data);
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("text", "name", "Name")}
          {this.renderInput("email", "username", "Username")}
          {this.renderInput("password", "password", "Password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
