import React from "react";
import "./gameList.css";
const Card = (props) => {
  return (
    <div
      className="card"
      onClick={() => {
        props.setState(props.setStateName);
      }}
    >
      <img
        className="card-img-top"
        src={`image/${props.imageName}`}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.block_name}</h5>
      </div>
    </div>
  );
};
const GameList = (props) => {
  return (
    <>
      <div className="game-screen">
        <Card
          setState={props.setState}
          setStateName="CR-askmenu"
          imageName="chain%20reaction.png"
          block_name="Chain Reaction"
        />
        <Card
          setState={props.setState}
          setStateName="SOS-askmenu"
          imageName="SOS.png"
          block_name="SOS"
        />
      </div>
    </>
  );
};

export default GameList;
