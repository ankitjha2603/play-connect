import React, { useState } from "react";
import ReactPlayer from "react-player";
import { checkMyTurn } from "../common.function";
import { click_cr_block, h, w } from "./cr.function";
import "./cr.board.css";
export default (props) => {
  const [errorVoiceShow, beep_error] = useState(false);
  const marked = JSON.parse(props.base_data.game.info.marked);
  const full_block = [];
  for (let i = 0; i < h; i++) {
    const layer = [];
    for (let j = 0; j < w; j++) {
      const ch = JSON.stringify([i, j]);
      const temp = marked[ch];
      if (!temp) {
        layer.push(
          <div
            className={`CR-BLOCK CR-BLOCK-${i}${j}`}
            onClick={() => click_cr_block(i, j, props)}
          >
            <div></div>
          </div>
        );
      } else {
        layer.push(
          <div
            className={`CR-BLOCK CR-BLOCK-${i}${j} ${temp[0]}-${temp[1]}`}
            onClick={() => click_cr_block(i, j, props)}
          >
            <div></div>
          </div>
        );
      }
    }
    full_block.push(<div className="CR-BLOCK-LAYER">{layer}</div>);
  }
  if (errorVoiceShow) {
    setTimeout(() => {
      beep_error(false);
    }, 300);
  }
  return (
    <>
      {!checkMyTurn(props.base_data) && !props.base_data.game.info.isOver ? (
        <div
          className="CR-HIDDEN"
          onClick={() => {
            beep_error(true);
          }}
        ></div>
      ) : (
        <></>
      )}
      {errorVoiceShow ? (
        <div hidden>
          <ReactPlayer
            url="vibration.mp3"
            playing={true}
            volume={1}
            loop={true}
          />
        </div>
      ) : (
        <></>
      )}
      <div
        className={`CR-BOARD ${
          { p1: "red", p2: "green" }[props.base_data.game.info.turn]
        }`}
      >
        {full_block}
      </div>
    </>
  );
};
