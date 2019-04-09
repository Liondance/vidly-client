import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Customers from "./components/customers";
import LoginForm from "./components/login-form";
import MovieForm from "./components/movie-form";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import NotFound from "./components/notfound";
import Rentals from "./components/rentals";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
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
