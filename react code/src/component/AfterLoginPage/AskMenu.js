import React from "react";
import "./AskMenu.css";
export default (props) => {
  return (
    <>
      <div className="blank-screen">
        <div className="question-box" id="question-box">
          <ul
            className="on-game-click-quesion-menu-list list-group"
            id="on-game-click-quesion-menu-list"
          >
            <li className="list-group-item">
              <h3>{props.gameName}</h3>
            </li>
            <li
              className="menu-option list-group-item create"
              style={{ cursor: "cell" }}
              onClick={() => props.setState(`${props.game}-started`)}
            >
              <div className="menu-option-icon"></div>
              <div className="menu-option-text">Create room</div>
            </li>
            <li
              className="menu-option list-group-item join"
              style={{ cursor: "copy" }}
              onClick={() => {
                const code = prompt("game code");
                if (code) {
                  props.writejoingamecode(code);
                  props.setState(`${props.game}-joined`);
                } else {
                  props.setState("GameList");
                }
              }}
            >
              <div className="menu-option-icon"></div>
              <div className="menu-option-text">Join Game</div>
            </li>
            <li
              className="menu-option list-group-item cancel"
              style={{ cursor: "no-drop" }}
              onClick={() => props.setState("GameList")}
            >
              <div className="menu-option-icon"></div>
              <div className="menu-option-text">Cancel</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
