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
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />;
            <ProtectedRoute
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
            <ProtectedRoute path="/customers" component={Customers} />
            <ProtectedRoute path="/rentals" component={Rentals} />
            <ProtectedRoute path="/unknown" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/unknown" />
          </Switch>
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
