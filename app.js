document.addEventListener("DOMContentLoaded", function () {
  const score = document.querySelector(".score");
  const startScreen = document.querySelector(".start-screen");
  const gameArea = document.querySelector(".game-area");
  // player obj for holding speed, start --------
  let player = { speed: 5, turning: 4 };

  //keys object: 4 directions with key val
  let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
  };
  // Listener for starting a game
  startScreen.addEventListener("click", start);
  document.addEventListener("keydown", pressOn);
  document.addEventListener("keyup", pressOff);

  // PLAY
  function playGame() {
    console.log("...playing...");
    let car = document.querySelector(".car");
    // let road = gameArea.getBoundingClientRect();
    // console.log(road);

    // Setting pos of car element by pressing Up Down Left Right
    if (player.start) {
      if (keys.ArrowUp) {
        player.y -= player.speed;
      }
      if (keys.ArrowDown) {
        player.y += player.speed;
      }
      if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.turning;
      }
      if (keys.ArrowRight) {
        player.x += player.turning;
      }
      car.style.left = player.x + "px";
      car.style.top = player.y + "px";
      window.requestAnimationFrame(playGame);
    }
  }

  function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log("ON", e.key);
    console.log(keys);
  }

  function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
  }

  function start() {
    startScreen.classList.add("hidden");
    gameArea.classList.remove("hidden");
    player.start = true;
    window.requestAnimationFrame(playGame);
    // Create a div element for the CAR
    let car = document.createElement("div");
    car.innerText = "CAR";
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    console.log("player: ", player);
    console.log("car: ", car);
  }
});
