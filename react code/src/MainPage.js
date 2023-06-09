import React, { useState, useEffect } from "react";
import { auth } from "./firebase/base";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./component/sign in page/SignIn";
import AfterLoginPage from "./component/AfterLoginPage/AfterLoginPage";
export default () => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) =>
      setUser(authUser ? authUser : null)
    );
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <h1>Wait...</h1>;
  } else if (user) {
    return <AfterLoginPage />;
  } else {
    return <SignIn />;
  }
};
