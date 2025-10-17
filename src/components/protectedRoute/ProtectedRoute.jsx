import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../dataProvider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const [{ user }, dispatch] = useContext(DataContext);
  // Uses context to access global state. Destructures to get user and dispatch
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      // Checks if there's no authenticated user (user is null, undefined, or falsy)
      navigate("/auth", { state: { msg, redirect } });
    }
    // If no user exists, navigates to the "/auth" route and passes msg and redirect as state data that the auth component can access
  }, [user]);
  // Closes the useEffect and sets user as a dependency, so this effect runs whenever the user value changes
  return children;
  // If user exists (authentication check passed), renders the child components. If user doesn't exist, the navigation happens before this return executes
};

export default ProtectedRoute;
// Defines a functional component named ProtectedRoute that accepts three props:
// children: The component(s) to render if access is granted
// msg: A message to pass along (likely for display on the auth page)
// redirect: A redirect path to return to after authentication
// Destructures the context value to extract:

// user: The current user object (null/undefined if not authenticated)
// dispatch: A function to update the context state (though not used in this component)