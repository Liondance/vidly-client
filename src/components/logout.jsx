import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    // force a complete window reload
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
