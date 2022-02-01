import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Routes } from "./Routes";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) => {

        return (auth?.loginAuth || localStorage.getItem("isLogin")) ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: `/${Routes.login}`, state: props.location }} />
          );
      }}
    />
  );
};

export default PrivateRoute;
