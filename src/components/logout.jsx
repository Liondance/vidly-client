import React, { Component } from "react";
import auth from "../services/auth-service";

class Logout extends Component {
  componentDidMount() {
    auth.logout();
    // force a complete window reload
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
