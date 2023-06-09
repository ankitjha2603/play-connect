import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { writeData, readData } from "../../../firebase/firebase.operation";
import SOSBoard from "./sos.board";
import ScoreBoard from "./sos.scoreboard";
import GameEndScreen from "./sos.game.endScreen.js";

import {
  checkMyTurn,
  refresh_time_Delay,
  generategameCode,
} from "../common.function";

export default (props) => {
  const [base_data, change_state] = useState({
    "game-code": null,
    game: null,
    user_email: getAuth().currentUser.email,
    uid: getAuth().currentUser.uid,
  });
  useEffect(() => {
    if (base_data.game === null) {
      readData("count/SOS", (count) => {
        const gcode = generategameCode(count + 1);
        readData(`player/${base_data.uid}/SOS`, (data) => {
          const genData = JSON.parse(data);
          genData.push(gcode);
          writeData(`player/${base_data.uid}/SOS`, JSON.stringify(genData));
        });
        const temp = {
          ...base_data,
          "game-code": gcode,
          game: {
            users: {
              p1: base_data.user_email,
              p2: "hold",
            },
            info: {
              sno: 0,
              marked: "null",
              v: "null",
              h: "null",
              d1: "null",
              d2: "null",
              turn: "p2",
              score: 0,
              isOver: false,
            },
          },
        };
        change_state(temp);
        writeData(`SOS/${gcode}`, temp.game);
        writeData("count/SOS", count + 1);
      });
    }
    const interval = setInterval(() => {
      if (base_data.game !== null) {
        readData(`SOS/${base_data["game-code"]}/info/sno`, (sno) => {
          if (sno !== base_data.game.info.sno) {
            const temp = { ...base_data };
            readData(`SOS/${temp["game-code"]}`, (only_game_data) => {
              change_state({
                ...temp,
                game: {
                  ...only_game_data,
                },
              });
            });
          }
        });
      }
    }, refresh_time_Delay);
    return () => clearInterval(interval);
  }, [base_data]);
  return (
    <>
      {base_data.game !== null ? (
        <>
          {!checkMyTurn(base_data) && !base_data.game.info.isOver ? (
            <div className="SOS-HIDDEN"></div>
          ) : (
            <></>
          )}
          {base_data.game.info.isOver ? (
            <GameEndScreen
              users={base_data.game.users}
              score={base_data.game.info.score}
              your_email={base_data.user_email}
              setState={props.setState}
            />
          ) : (
            <></>
          )}
          <SOSBoard base_data={base_data} change_state={change_state} />
          <ScoreBoard
            score={
              base_data.game.users.p1 === base_data.user_email
                ? base_data.game.info.score
                : -base_data.game.info.score
            }
            gameCode={base_data["game-code"]}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
