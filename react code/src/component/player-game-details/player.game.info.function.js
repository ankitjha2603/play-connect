import { readData } from "../../firebase/firebase.operation";
import { getAuth } from "firebase/auth";

const generateData = (gamename, gameCode, game, your_email, id) => {
  const response = {
    game: gamename,
    gameCode: gameCode,
    opponent: null,
    progress: game.info.isOver ? "ended" : "in progress",
    result: null,
  };
  if (game.users.p1 === your_email) {
    response.opponent = game.users.p2;
  } else {
    game.info.score = -game.info.score;
    response.opponent = game.users.p1;
  }
  if (game.info.isOver) {
    if (game.info.score === 0) {
      response.result = "DRAW";
    } else if (game.info.score > 0) {
      response.result = "win";
    } else {
      response.result = "loose";
    }
  } else {
    response.result = "-";
  }
  return response;
};
export default (changeRows) => {
  let rows = [];
  const uid = getAuth().currentUser.uid;
  const email = getAuth().currentUser.email;
  readData(`player/${uid}`, (playerInfo) => {
    const { SOS, CR } = playerInfo;
    JSON.parse(SOS).forEach((sos_game_code) => {
      readData(`SOS/${sos_game_code}`, (game) => {
        let content = generateData("SOS", sos_game_code, game, email);
        rows = [...rows, content];
        changeRows(rows);
      });
    });
    JSON.parse(CR).forEach((sos_game_code) => {
      readData(`CR/${sos_game_code}`, (game) => {
        let content = generateData("CR", sos_game_code, game, email);
        rows = [...rows, content];
        changeRows(rows);
      });
    });
  });
  return rows;
};
