import React, { useState } from "react";
import GameList from "./GameList";
import AskMenu from "./AskMenu";
import SOSCreated from "./sos/sos.created";
import SOSJoined from "./sos/sos.joined";
import GameDetails from "../player-game-details/player.game.details";
import CrCreated from "./CR/cr.created";
import CrJoined from "./CR/cr.joined";
export default () => {
  const [state, setState] = useState("GameList");
  const [joingameCode, writejoingamecode] = useState("");
  switch (state) {
    case "GameList":
      return (
        <>
          <GameList setState={setState} />
          <GameDetails />
        </>
      );
    case "SOS-askmenu":
      return (
        <>
          <GameList />
          <GameDetails />
          <AskMenu
            setState={setState}
            game="SOS"
            gameName="SOS"
            writejoingamecode={writejoingamecode}
          />
        </>
      );
    case "CR-askmenu":
      return (
        <>
          <GameList />
          <GameDetails />
          <AskMenu
            setState={setState}
            game="CR"
            gameName="Chain Reaction"
            writejoingamecode={writejoingamecode}
          />
        </>
      );
    case "SOS-started":
      return (
        <>
          <SOSCreated setState={setState} />
        </>
      );
    case "SOS-joined":
      return (
        <>
          <SOSJoined gamecode={joingameCode} setState={setState} />
        </>
      );
    case "CR-started":
      return (
        <>
          <CrCreated setState={setState} />
        </>
      );
    case "CR-joined":
      return (
        <>
          <CrJoined gamecode={joingameCode} setState={setState} />
        </>
      );
  }
};
