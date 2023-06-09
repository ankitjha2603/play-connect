import React, { useState } from "react";
import { writeData } from "../../../firebase/firebase.operation";
export const double_click_delay = 750;

export const sos_dimention = 10;
export const block = (i, j) => document.querySelector(`.SOS-BLOCK-${i}${j}`);

export const getByText = (i, j, props) => {
  if (props.base_data.game.info.marked === "null") {
    return ["", ""];
  } else {
    const tt = JSON.parse(props.base_data.game.info.marked)[
      JSON.stringify([i, j])
    ];
    if (tt === undefined) {
      return ["", ""];
    } else {
      return ["SOS-WRITEN", tt];
    }
  }
};

export const getInnerLine = (i, j, props) => {
  let { v, h, d1, d2 } = props.base_data.game.info;
  v = v === "null" ? {} : JSON.parse(v);
  h = h === "null" ? {} : JSON.parse(h);
  d1 = d1 === "null" ? {} : JSON.parse(d1);
  d2 = d2 === "null" ? {} : JSON.parse(d2);
  const position = JSON.stringify([i, j]);
  return (
    <>
      <div
        className={`sos-block-innerline verticle ${v[position] ? "show" : ""}`}
      ></div>
      <div
        className={`sos-block-innerline horizontal ${
          h[position] ? "show" : ""
        }`}
      ></div>
      <div
        className={`sos-block-innerline diagonal-1 ${
          d1[position] ? "show" : ""
        }`}
      ></div>
      <div
        className={`sos-block-innerline diagonal-2 ${
          d2[position] ? "show" : ""
        }`}
      ></div>
    </>
  );
};
export const game_proceed = (i, j, props) => {
  const t = { ...props.base_data };
  const choice = block(i, j).getAttribute("text");
  if (t.game.info.marked === "null") {
    const genObject = {};
    genObject[JSON.stringify([i, j])] = choice;
    t.game.info.marked = genObject;
    t.game.info.marked = JSON.stringify(t.game.info.marked);
  } else {
    t.game.info.marked = JSON.parse(t.game.info.marked);
    t.game.info.marked[JSON.stringify([i, j])] = choice;
    t.game.info.marked = JSON.stringify(t.game.info.marked);
  }

  if (
    Object.keys(JSON.parse(t.game.info.marked)).length ===
    sos_dimention ** 2
  ) {
    t.game.info.isOver = true;
  }
  t.game.info.turn = t.game.info.turn === "p1" ? "p2" : "p1";
  t.game.info.sno++;
  /********************************* */
  const all_cross = check_sos(i, j, choice, choice);
  if (all_cross.length !== 0) {
    t.game.info.turn = t.game.info.turn === "p1" ? "p2" : "p1";
  }
  t.game.info.score =
    t.game.info.score +
    (t.game.info.turn === "p1" ? -1 : +1) * all_cross.length;
  all_cross.forEach(([p1, p2, p3, direction]) => {
    if (t.game.info[direction] === "null") {
      t.game.info[direction] = {};
    } else {
      t.game.info[direction] = JSON.parse(t.game.info[direction]);
    }
    t.game.info[direction][JSON.stringify(p1)] = true;
    t.game.info[direction][JSON.stringify(p2)] = true;
    t.game.info[direction][JSON.stringify(p3)] = true;
    t.game.info[direction] = JSON.stringify(t.game.info[direction]);
  });
  /********************************* */
  writeData(`SOS/${t["game-code"]}`, t.game);
  props.change_state(t);
};
export const sos_block_click = (i, j, props) => {
  const _block = block(i, j);
  if (_block.classList.contains("SOS-block-blocked")) {
    return 55;
  }
  if (_block.classList.contains("SOS-WRITEN")) {
    _block.setAttribute("text", "S");
  } else {
    _block.classList.add("SOS-WRITEN");
    setTimeout(() => {
      game_proceed(i, j, props);
    }, double_click_delay);
    _block.setAttribute("text", "O");
  }
};

export const check_sos = (i, j, choice) => {
  const type_of_way = {
    h: "horizontal",
    v: "verticle",
    d1: "diagonal-1",
    d2: "diagonal-2",
  };
  const ways = {
    O: [
      [[-1, 0], [1, 0], "v"],
      [[-1, -1], [1, 1], "d2"],
      [[0, -1], [0, +1], "h"],
      [[1, -1], [-1, 1], "d1"],
    ],
    S: [
      [[-2, -2], [1, 1], "d2"],
      [[0, -2], [0, 1], "h"],
      [[2, -2], [-1, +1], "d1"],
      [[-2, 2], [1, -1], "d1"],
      [[0, 2], [0, -1], "h"],
      [[2, 2], [-1, -1], "d2"],
      [[-2, 0], [1, 0], "v"],
      [[2, 0], [-1, 0], "v"],
    ],
  };
  const match = new Array();

  const includes = ([i, j], choice) => {
    const check_block = block(i, j);
    if (check_block) {
      return check_block.getAttribute("text") === choice;
    }
    return false;
  };
  ways[choice].forEach(([st_diff, diff, direction]) => {
    const p1 = [i + st_diff[0], j + st_diff[1]];
    const p2 = [p1[0] + diff[0], p1[1] + diff[1]];
    const p3 = [p2[0] + diff[0], p2[1] + diff[1]];
    if (includes(p1, "S") && includes(p2, "O") && includes(p3, "S")) {
      match.push([p1, p2, p3, direction]);
    }
  });
  return match;
};

/*************************** */
/*************************** */
