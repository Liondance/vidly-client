import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Customers from "./components/customers";
import LoginForm from "./components/login-form";
import Logout from "./components/logout";
import MovieForm from "./components/movie-form";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import NotFound from "./components/notfound";
import RegisterForm from "./components/register-form";
import Rentals from "./components/rentals";
import auth from "./services/auth-service";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/unknown" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/unknown" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
