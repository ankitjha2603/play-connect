export const refresh_time_Delay = 100;
export const checkMyTurn = (base_data) => {
  return (
    base_data.game.users[base_data.game.info.turn] !== base_data.user_email
  );
};
export const generategameCode = (num) => {
  const lower_character = "abcdefghijklmnopqrstuvwxyz";
  const n = 26;
  let code = "";
  while (num) {
    code = lower_character.charAt(num % n) + code;
    num = Math.floor(num / n);
  }
  return code;
};

export const copyText = () => {
  var copyText = document.getElementById("game-code");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  alert("Game code copied! ");
};
