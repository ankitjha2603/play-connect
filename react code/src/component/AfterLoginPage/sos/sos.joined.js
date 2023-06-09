import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { writeData, readData } from "../../../firebase/firebase.operation";
import SOSBoard from "./sos.board";
import ScoreBoard from "./sos.scoreboard";
import GameEndScreen from "./sos.game.endScreen.js";

import { checkMyTurn, refresh_time_Delay } from "../common.function";

export default (props) => {
  const [base_data, change_state] = useState({
    "game-code": props.gamecode,
    game: null,
    user_email: getAuth().currentUser.email,
    uid: getAuth().currentUser.uid,
  });
  useEffect(() => {
    if (base_data.game === null) {
      readData(`player/${base_data.uid}/SOS`, (data) => {
        const genData = JSON.parse(data);
        if (!genData.includes(base_data["game-code"])) {
          genData.push(base_data["game-code"]);
          writeData(`player/${base_data.uid}/SOS`, JSON.stringify(genData));
        }
      });
      readData(
        `SOS/${base_data["game-code"]}`,
        (gd) => {
          if (
            gd.users.p1 !== base_data.user_email &&
            gd.users.p2 !== base_data.user_email
          ) {
            if (gd.users.p2 === "hold") {
              gd.users.p2 = base_data.user_email;
            } else {
              alert("Two players have already joined the game.");
              props.setState("GameList");
            }
            gd.info.sno++;
            change_state({
              ...base_data,
              game: {
                ...gd,
              },
            });
            writeData(`SOS/${base_data["game-code"]}`, gd);
          } else {
            change_state({
              ...base_data,
              game: {
                ...gd,
              },
            });
          }
        },
        () => {
          alert("Invalid game code");
          props.setState("GameList");
        }
      );
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
              base_data.game.users.f1 === base_data.user_email
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
