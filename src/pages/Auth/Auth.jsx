import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link,useNavigate } from "react-router-dom";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate=useNavigate()
  console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);


    setError("");

    // Validate inputs
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });

      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userInfo);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signIn: false });
        navigate("/")
      } catch (err) {
        console.error("Sign in error:", err);
        setError(err.message);
        setLoading({ ...loading, signIn: false });
         navigate("/");
      }
    } else {
      setLoading({ ...loading, signUp: true });

      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signUp: false });
      } catch (err) {
        console.error("Sign up error:", err);
        setError(err.message);
        setLoading({ ...loading, signUp: false });
      }
    }
  };

  return (
    <section className={classes.login}>
      <Link to= "/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign-in</h1>
        {error && <div className={classes.error}>{error}</div>}

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
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
            disabled={loading.signIn || loading.signUp}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>

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
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;

// import React, { useState, useContext } from "react";
// import classes from "./SignUp.module.css";
// import { Link,useNavigate} from "react-router-dom";
// import { auth } from "../../utility/firebase";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { ClipLoader } from "react-spinners";
// import { DataContext } from "../../components/dataProvider/DataProvider";
// import { Type } from "../../utility/Action.type";

// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState({
//     signIn: false,
//     signUp: false,
//   });

//   const [{ user }, dispatch] = useContext(DataContext);
//   const navigate= useNavigate()
//   console.log(user);

//   const authHandler = async (e) => {
//     e.preventDefault();
//     console.log("Button clicked:", e.target.name);
//     console.log("Email:", email);
//     console.log("Password length:", password ? password.length : 0);

//     // Clear previous errors
//     setError("");

//     // Validate inputs
//     if (!email || !password) {
//       setError("Please enter both email and password");
//       return;
//     }

//     if (!email.includes("@")) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     if (e.target.name === "signin") {
//       console.log("Attempting sign in...");
//       setLoading({ ...loading, signIn: true });

//       try {
//         const userInfo = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         console.log("Sign in successful:", userInfo);
//         dispatch({
//           type: Type.SET_USER,
//           user: userInfo.user,
//         });
//         setLoading({ ...loading, signIn: false });
//         navigate("/")
//       } catch (err) {
//         console.error("Sign in error:", err.code, err.message);

//         // More user-friendly error messages
//         let errorMessage = err.message;
//         switch (err.code) {
//           case "auth/user-not-found":
//             errorMessage = "No account found with this email address.";
//             break;
//           case "auth/wrong-password":
//             errorMessage = "Incorrect password.";
//             break;
//           case "auth/invalid-email":
//             errorMessage = "Invalid email address.";
//             break;
//           case "auth/invalid-credential":
//             errorMessage = "Invalid email or password.";
//             break;
//           case "auth/too-many-requests":
//             errorMessage = "Too many failed attempts. Please try again later.";
//             break;
//           case "auth/network-request-failed":
//             errorMessage = "Network error. Please check your connection.";
//             break;
//           default:
//             errorMessage = `Sign in failed: ${err.message}`;
//         }

//         setError(errorMessage);
//         setLoading({ ...loading, signIn: false });
//       }
//     } else if (e.target.name === "signup") {
//       console.log("Attempting sign up...");
//       setLoading({ ...loading, signUp: true });

//       try {
//         const userInfo = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         console.log("Sign up successful:", userInfo);
//         dispatch({
//           type: Type.SET_USER,
//           user: userInfo.user,
//         });
//         setLoading({ ...loading, signUp: false });
//       } catch (err) {
//         console.error("Sign up error:", err.code, err.message);

//         // More user-friendly error messages
//         let errorMessage = err.message;
//         switch (err.code) {
//           case "auth/email-already-in-use":
//             errorMessage = "An account with this email already exists.";
//             break;
//           case "auth/weak-password":
//             errorMessage = "Password should be at least 6 characters.";
//             break;
//           case "auth/invalid-email":
//             errorMessage = "Invalid email address.";
//             break;
//           case "auth/network-request-failed":
//             errorMessage = "Network error. Please check your connection.";
//             break;
//           default:
//             errorMessage = `Sign up failed: ${err.message}`;
//         }

//         setError(errorMessage);
//         setLoading({ ...loading, signUp: false });
//       }
//     }
//   };

//   return (
//     <section className={classes.login}>
//       <Link>
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
//           alt="Amazon Logo"
//         />
//       </Link>
//       <div className={classes.login_container}>
//         <h1>Sign-in</h1>
//         {error && <div className={classes.error}>{error}</div>}

//         <form action="">
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               id="email"
//               autoComplete="email"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             onClick={authHandler}
//             name="signin"
//             className={classes.login_signInButton}
//             disabled={loading.signIn || loading.signUp}
//           >
//             {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
//           </button>

//           <button
//             type="button"
//             onClick={authHandler}
//             name="signup"
//             className={classes.login_registerButton}
//             disabled={loading.signIn || loading.signUp}
//           >
//             {loading.signUp ? (
//               <ClipLoader color="#000" size={15} />
//             ) : (
//               "Create Your Amazon Account"
//             )}
//           </button>
//         </form>

//         <p>
//           By signing-in you agree to the AMAZON FAKE CLONE conditions of Use &
//           Sale. Please see our Privacy Notice, our Cookies Notice and our
//           Interest-Based Ads Notice.
//         </p>

//         {error && (
//           <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Auth;
