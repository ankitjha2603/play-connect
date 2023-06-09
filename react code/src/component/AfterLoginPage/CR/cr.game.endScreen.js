import react from "react";

export default (props) => {
  const { users, score, your_email } = props;
  if (score === 0) {
    return (
      <>
        <div className="cr-game-end-screen draw">
          <span>DRAW</span>
          <button onClick={() => props.setState("GameList")}>
            Back to Main Menu
          </button>
        </div>
      </>
    );
  }
  let win_of_lose, text;
  if (score > 0) {
    if (users.p1 === your_email) {
      win_of_lose = "winned";
      text = "YOU WON";
    } else {
      win_of_lose = "loosed";
      text = "YOU LOOSE";
    }
  } else {
    if (users.p1 !== your_email) {
      win_of_lose = "winned";
      text = "YOU WON";
    } else {
      win_of_lose = "loosed";
      text = "YOU LOOSE";
    }
  }
  return (
    <>
      <div className={`cr-game-end-screen ${win_of_lose}`}>
        <span>{text}</span>
        <button onClick={() => props.setState("GameList")}>
          Back to Main Menu
        </button>
      </div>
    </>
  );
};
