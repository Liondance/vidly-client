import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
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

  oldValidateChange = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") {
        return "User name is required";
      }
    }
    if (name === "password") {
      if (value.trim() === "") {
        return "Password is required";
      }
    }
    return null;
  };

  validateChange = ({ name, value }) => {
    const object = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(object, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const horror = this.validateChange(input);
    if (horror) {
      errors[input.name] = horror;
    } else {
      delete errors[input.name];
    }
    let account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  oldValidateSubmit = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "") {
      errors.username = "User name is required";
    }
    if (account.password.trim() === "") {
      errors.password = "Password is required";
    }
    return errors;
  };

  validateSubmit = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, options);
    if (!result.error) return {};

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    console.log(result);
    console.log(errors);
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validateSubmit();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      console.log(`submitted ${this.state.account.username}`);
    }
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            name="username"
            label="User name"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
