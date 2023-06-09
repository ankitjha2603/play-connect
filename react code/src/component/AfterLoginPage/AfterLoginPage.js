import React, { useEffect } from "react";
import SignOut from "./SignOut";
import GameScreen from "./GameScreen";
import "./AfterLoginPage.css";
import { getAuth } from "firebase/auth";
import { readData, writeData } from "../../firebase/firebase.operation";

const AfterLoginPage = () => {
  useEffect(() => {
    readData(
      `player/${getAuth().currentUser.uid}`,
      () => {},
      (path) => {
        writeData(path, {
          SOS: "[]",
          CR: "[]",
        });
      }
    );
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand"
          onClick={() => window.location.reload(false)}
          style={{ cursor: "pointer" }}
        >
          Play connect
        </a>
        <div className="flex-center">
          <image
            className="profile-image"
            src={getAuth().currentUser.photoURL}
            referrerpolicy="no-referrer"
            height="400px"
            width="400px"
          />
          <SignOut />
        </div>
      </nav>
      <GameScreen />
    </>
  );
};

export default AfterLoginPage;
