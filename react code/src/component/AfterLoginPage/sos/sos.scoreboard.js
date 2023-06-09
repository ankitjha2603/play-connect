import React from "react";
import { copyText } from "../common.function";

export default (props) => {
  return (
    <div className="SOS-ScoreBoard">
      <h3 className={`sos-score ${props.score >= 0 ? "positive" : "negative"}`}>
        {props.score}
      </h3>
      <div onClick={copyText}>
        <input
          id="game-code"
          type="text"
          className="game-code"
          value={props.gameCode}
          disabled
        />
      </div>
    </div>
  );
};
