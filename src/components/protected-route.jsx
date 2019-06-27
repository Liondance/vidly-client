import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "../services/auth-service";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();
  if (!user) {
    return <Redirect to="/login" />;
  } else if (Component) {
    return <Route path={path} component={Component} {...rest} />;
  } else if (render) {
    return <Route path={path} render={render} {...rest} />;
  } else {
    return <Route {...rest} />;
  }
};

export default ProtectedRoute;
