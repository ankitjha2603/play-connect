import React from "react";
import GoogleButton from "react-google-button";
import { auth } from "../../firebase/base";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import "./LoginSignup.css";
export default () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  return (
    <>
      <div className="login-signup-main-body">
        <div className="main">
          <div className="signup">
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <div className="google-botton-box">
              <GoogleButton onClick={googleSignIn}>
                Sign In with Google
              </GoogleButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
