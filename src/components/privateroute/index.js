import React from "react";
import { Route, Redirect } from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({ children, machine, ...rest }) {
  const { user } = machine.context;
  console.log("PrivateRoute() User: ");
  console.log(user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user !== undefined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
