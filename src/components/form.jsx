import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  /*
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
  */

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
    let data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  /*
  oldValidateSubmit = () => {
    const errors = {};
    const { data } = this.state;
    if (data.username.trim() === "") {
      errors.username = "User name is required";
    }
    if (data.password.trim() === "") {
      errors.password = "Password is required";
    }
    return errors;
  };
  */

  validateSubmit = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validateSubmit();
    this.setState({ errors: errors || {} });
    if (!errors) {
      this.doSubmit(this.state.data);
    }
  };

  renderInput = (type, name, label) => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors ? errors[name] : {}}
      />
    );
  };

  renderButton = label => {
    return (
      <button
        disabled={this.validateSubmit()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };
}

export default Form;
