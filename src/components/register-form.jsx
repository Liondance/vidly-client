import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { registerUser } from "../services/userService";

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
    console.log(`submitted ${this.state.data.username}`);
    await registerUser(this.state.data);
    this.props.history.replace("/");
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
