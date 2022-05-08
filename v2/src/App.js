import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./components/protected-route";
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
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} k={"Protected"} />
            <Route path="/movies/:id" component={MovieForm} k={"Protected"} />
            <Route
              path="/movies"
              render={props => (
                <Movies {...props} user={user} k={"Protected"} />
              )}
            />
            <Route path="/customers" component={Customers} k={"Protected"} />
            <Route path="/rentals" component={Rentals} k={"Protected"} />
            <Route path="/unknown" component={NotFound} k={"Protected"} />
            <Navigate from="/" exact to="/movies" />
            <Navigate to="/unknown" />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

/*
<ProtectedRoute
path="/movies/:id"
render={props => {
  return <MovieForm {...props} />;
}}
/>
*/
