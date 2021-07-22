document.addEventListener("DOMContentLoaded", function () {
  const score = document.querySelector(".score");
  const startScreen = document.querySelector(".start-screen");
  const gameArea = document.querySelector(".game-area");

  startScreen.addEventListener("click", start);
  document.addEventListener("keydown", pressOn);
  document.addEventListener("keydown", pressOff);

  function pressOn(e) {
    e.preventDefault();
    console.log("ON", e.key);
  }

  function pressOff(e) {
    e.preventDefault();
    console.log("OFF", e.key);
  }

  function start() {
    console.log("you clicked screen");
  }
});
