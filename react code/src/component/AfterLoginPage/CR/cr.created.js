import React, { useEffect, useState } from "react";
import { readData, writeData } from "../../../firebase/firebase.operation";
import CrBoard from "./cr.board";
import { getAuth } from "firebase/auth";
import { refresh_time_Delay, generategameCode } from "../common.function";
import GameCodeShow from "./cr.gamecodeshow";
import GameEndScreen from "./cr.game.endScreen.js";
export default (props) => {
  const [base_data, change_state] = useState({
    "game-code": null,
    game: null,
    user_email: getAuth().currentUser.email,
    uid: getAuth().currentUser.uid,
  });
  useEffect(() => {
    if (base_data.game === null) {
      readData("count/CR", (count) => {
        const gcode = generategameCode(count + 1);
        readData(`player/${base_data.uid}/CR`, (data) => {
          const genData = JSON.parse(data);
          genData.push(gcode);
          writeData(`player/${base_data.uid}/CR`, JSON.stringify(genData));
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
              marked: `{}`,
              turn: "p2",
              isOver: false,
              score: 0,
            },
          },
        };
        change_state(temp);
        writeData(`CR/${gcode}`, temp.game);
        writeData("count/CR", count + 1);
      });
    }
    const interval = setInterval(() => {
      if (base_data.game !== null) {
        readData(`CR/${base_data["game-code"]}/info/sno`, (sno) => {
          if (sno !== base_data.game.info.sno) {
            const temp = { ...base_data };
            readData(`CR/${temp["game-code"]}`, (only_game_data) => {
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
          <CrBoard base_data={base_data} change_state={change_state} />
          <GameCodeShow gameCode={base_data["game-code"]} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
