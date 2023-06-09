import { writeData } from "../../../firebase/firebase.operation";
export const h = 9;
export const w = 6;

const block = (i, j) => document.querySelector(`.CR-BLOCK-${i}${j}`);

const getPositionDetail = (i, j) => {
  if (i === 0 && j === 0) {
    return {
      limit: 1,
      next: [
        [0, 1],
        [1, 0],
      ],
    };
  } else if (i === 0 && j === w - 1) {
    return {
      limit: 1,
      next: [
        [0, j - 1],
        [1, j],
      ],
    };
  } else if (i === h - 1 && j === 0) {
    return {
      limit: 1,
      next: [
        [i - 1, 0],
        [i, 1],
      ],
    };
  } else if (i === h - 1 && j === w - 1) {
    return {
      limit: 1,
      next: [
        [i - 1, j],
        [i, j - 1],
      ],
    };
  } else if (i === 0) {
    return {
      limit: 2,
      next: [
        [i, j - 1],
        [i, j + 1],
        [i + 1, j],
      ],
    };
  } else if (i === h - 1) {
    return {
      limit: 2,
      next: [
        [i, j - 1],
        [i, j + 1],
        [i - 1, j],
      ],
    };
  } else if (j === 0) {
    return {
      limit: 2,
      next: [
        [i - 1, j],
        [i + 1, j],
        [i, j + 1],
      ],
    };
  } else if (j === w - 1) {
    return {
      limit: 2,
      next: [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
      ],
    };
  }
  return {
    limit: 3,
    next: [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ],
  };
};
export const click_cr_block = (i, j, props) => {
  const choice = props.base_data.game.info.turn === "p2" ? "g" : "r";
  const changeTurn = { p1: "p2", p2: "p1" };
  let valid = true;
  const marked = JSON.parse(props.base_data.game.info.marked)[
    JSON.stringify([i, j])
  ];
  if (marked !== undefined) {
    valid = marked[0] === choice;
  }
  if (valid) {
    const temp = BreathFirstMovement(
      i,
      j,
      JSON.parse(props.base_data.game.info.marked),
      choice
    );
    const temp_win = win(JSON.parse(temp));
    writeData(`CR/${props.base_data["game-code"]}`, {
      ...props.base_data.game,
      info: {
        ...props.base_data.game.info,
        sno: props.base_data.game.info.sno + 1,
        marked: temp,
        turn: changeTurn[props.base_data.game.info.turn],
        isOver: Boolean(temp_win),
        score: temp_win,
      },
    });
    setTimeout(() => {
      props.change_state({
        ...props.base_data,
        game: {
          ...props.base_data.game,
          info: {
            ...props.base_data.game.info,
            sno: props.base_data.game.info.sno + 1,
            marked: temp,
            turn: changeTurn[props.base_data.game.info.turn],
            isOver: Boolean(temp_win),
            score: temp_win,
          },
        },
      });
    }, 500);
  }
};
const BreathFirstMovement = (i, j, marked, choice) => {
  let move = [[i, j]];
  let stop = false;
  while (move.length && !stop) {
    const temp = win(marked);
    if (temp !== 0 && temp === { g: 1, r: -1 }[choice]) {
      return JSON.stringify(marked);
    }
    const copy = [...move];
    move.splice(0, move.length);
    copy.forEach(([di, dj]) => {
      let curr = marked[JSON.stringify([di, dj])];
      if (curr === undefined) {
        curr = [choice, 1];
      } else {
        curr = [choice, curr[1] + 1];
      }
      const { limit, next } = getPositionDetail(di, dj);
      if (curr[1] <= limit) {
        marked[JSON.stringify([di, dj])] = curr;
      } else {
        marked[JSON.stringify([di, dj])] = [choice, curr[0] - limit - 1];
        if ((curr[1] = limit + 1)) {
          delete marked[JSON.stringify([di, dj])];
        }
        move = [...move, ...next];
      }
    });
  }
  return JSON.stringify(marked);
};
const win = (marked) => {
  const all = Object.values(marked);
  if (all.length < 2) {
    return 0;
  }
  const getSetColor = Object();
  all.forEach(([color, count]) => {
    getSetColor[color] = true;
  });
  if (Object.keys(getSetColor).length === 1) {
    return { g: 1, r: -1 }[Object.keys(getSetColor)[0]];
  }
  return 0;
};
