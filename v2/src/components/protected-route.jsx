import React from "react";
import { Route, Navigate } from "react-router-dom";

import auth from "../services/auth-service";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();
  if (!user) {
    return <Navigate to="/login" />;
  } else if (Component) {
    return <Route path={path} component={Component} {...rest} />;
  } else if (render) {
    return <Route path={path} render={render} {...rest} />;
  } else {
    return <Route {...rest} />;
  }
};

export default ProtectedRoute;
