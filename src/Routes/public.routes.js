import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Routes } from "./Routes";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (localStorage.getItem('isLogin') && restricted) ? (
            <Redirect exact to={`/${Routes.profile}`} />
          ) : (
              <Component {...props} />
            )
        
      }}
    />
  );
}

export default PublicRoute;
