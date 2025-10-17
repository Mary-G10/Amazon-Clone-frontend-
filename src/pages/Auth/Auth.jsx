import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/dataProvider/DataProvider";
import { Type } from "../../utility/Action.type";



function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Creates state variables for email and password input fields, initialized as empty strings
  const [error, setError] = useState("");
  // Creates state for storing and displaying error messages
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  // Creates loading state object to track whether sign-in or sign-up operations are in progress
  const [{ user }, dispatch] = useContext(DataContext);
  // Destructures user data and dispatch function from the global context
  const navigate = useNavigate();
  const navStateData = useLocation();
  // Gets navigation function and current location data (including any state passed during navigation)
  console.log(navStateData);
  // console.log(user);

  const authHandler = async (e) => {
    // Defines an asynchronous function to handle both sign-in and sign-up
    e.preventDefault();
    console.log(e.target.name);
    // Prevents form default submission and logs which button was clicked (signin or signup)
    setError("");
    // Clears any previous error messages

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    // Validates that both email and password fields are filled; shows error and exits if not
    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      // Checks if the sign-in button was clicked,Sets loading state to true for sign-in button
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Attempts to sign in user with Firebase authentication
        console.log(userInfo);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        // Logs user info and dispatches action to store user in global context
        setLoading({ ...loading, signIn: false });
        navigate(navStateData?.state?.redirect || "/");
        // Turns off loading and navigates to redirect URL (if provided) or home page
      } catch (err) {
        console.error("Sign in error:", err);
        setError(err.message);
        setLoading({ ...loading, signIn: false });
        // Handles errors by logging them, displaying error message, and turning off loading
        //  navigate("/");
      }
    } else {
      setLoading({ ...loading, signUp: true });
      // If not sign-in, handles sign-up and sets loading state
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Creates new user account with Firebase
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signUp: false });
        navigate("/");
        // Updates global state with new user, turns off loading, navigates to home
      } catch (err) {
        console.error("Sign up error:", err);
        setError(err.message);
        setLoading({ ...loading, signUp: false });
      }
    }
  };
  // Handles sign-up errors similarly to sign-in errors

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>
      {/* Creates clickable Amazon logo that links to homepage */}
      <div className={classes.login_container}>
        <h1>Sign-in</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
        {/* Conditionally displays a message if one was passed through navigation state */}
        {error && <div className={classes.error}>{error}</div>}
        {/* Conditionally displays error message if one exists */}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              autoComplete="email"
              required
            />
          </div>
          {/* Email input field with controlled component pattern, proper labeling, and autocomplete */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
              required
            />
          </div>
          {/*  Password input field with similar controlled component setup*/}
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
            disabled={loading.signIn || loading.signUp}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
          {/* Sign-in button that shows spinner when loading, disabled during any loading state */}
          <button
            type="button"
            onClick={authHandler}
            name="signup"
            className={classes.login_registerButton}
            disabled={loading.signIn || loading.signUp}
          >
            {loading.signUp ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "Create Your Amazon Account"
            )}
          </button>
          {/* Sign-up button with similar loading state handling */}
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* Terms and conditions text (note: mentions "FAKE CLONE") */}
      </div>
    </section>
  );
}
export default Auth;
// This component provides a complete authentication interface with Firebase integration, loading states, error handling, and navigation logic.
