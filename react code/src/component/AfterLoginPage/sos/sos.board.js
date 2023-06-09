import React from "react";
import "./sos.board.css";
import { getByText, getInnerLine, sos_block_click } from "./sos.function";
import { sos_dimention } from "./sos.function";
export default (props) => {
  const full_block = [];
  for (let i = 0; i < sos_dimention; i++) {
    const layer = [];
    for (let j = 0; j < sos_dimention; j++) {
      const [dclass, dtext] = getByText(i, j, props);
      if (dclass === "") {
        layer.push(
          <div
            className={`SOS-BLOCK SOS-BLOCK-${i}${j}`}
            onClick={() => {
              sos_block_click(i, j, props);
            }}
          >
            {getInnerLine(i, j, props)}
          </div>
        );
      } else {
        layer.push(
          <div
            className={`SOS-BLOCK SOS-BLOCK-${i}${j} ${dclass}`}
            text={dtext}
          >
            {getInnerLine(i, j, props)}
          </div>
        );
      }
    }
    full_block.push(<div className="SOS-BLOCK-LAYER">{layer}</div>);
  }
  return (
    <>
      <div className="SOS-BOARD">{full_block}</div>
    </>
  );
};
