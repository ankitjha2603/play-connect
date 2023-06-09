import React, { useEffect } from "react";
import { copyText } from "../common.function";
export default (props) => {
  return (
    <div className="CR-ScoreBoard">
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
