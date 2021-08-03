document.addEventListener("DOMContentLoaded", function () {
  const score = document.querySelector(".score");
  const startScreen = document.querySelector(".start-screen");
  const gameArea = document.querySelector(".game-area");
  // player obj for holding speed, start --------
  let player = { speed: 4, turning: 5 };

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

  //Moving lines downwards
  function moveLines() {
    let lines = document.querySelectorAll(".line");
    lines.forEach((line) => {
      console.log(line.y);
      if (line.y > 750) {
        line.y -= 750;
      }
      // !!!
      line.y += player.speed;
      line.style.top = line.y + "px";
    });
  }

  // Moving other cars downwards
  function moveOtherCars() {
    let element = document.querySelectorAll(".other-car");
    element.forEach((car) => {
      console.log(car.y);
      if (car.y >= 1500) {
        car.y -= 600;
        car.style.left = Math.floor(Math.random() * 200) + "px";
      }

      // !!!
      car.y += player.speed;
      car.style.top = car.y + "px";
    });
  }

  // PLAY
  function playGame() {
    // console.log("...playing...");
    let car = document.querySelector(".car");
    moveLines();
    moveOtherCars();
    let road = gameArea.getBoundingClientRect();
    // Setting pos of car element by pressing Up Down Left Right
    if (player.start) {
      if (keys.ArrowUp && player.y > road.top) {
        player.y -= player.speed;
      }
      if (keys.ArrowDown && player.y < road.height - 240) {
        player.y += player.speed;
      }
      if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.turning;
      }
      if (keys.ArrowRight && player.x < road.width - 71) {
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

  // ON GAME START
  function start() {
    startScreen.classList.add("hidden");
    gameArea.classList.remove("hidden");
    player.start = true;
    // Lines added
    for (let x = 0; x < 5; x++) {
      let lineDiv = document.createElement("div");
      lineDiv.classList.add("line");
      //Adding y position
      lineDiv.y = x * 150;
      lineDiv.style.top = x * 200 + "px";
      gameArea.appendChild(lineDiv);
    }
    window.requestAnimationFrame(playGame);
    // Create a div for the CAR
    let car = document.createElement("div");
    car.innerText = "My CAR";
    car.setAttribute("class", "car");
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    console.log("player: ", player);
    console.log("car: ", car);

    // Other cars added
    for (let x = 0; x < 13; x++) {
      let otherCar = document.createElement("div");
      otherCar.classList.add("other-car");
      //
      // otherCar.y = Math.floor(Math.random() * 500) * -1;
      otherCar.y = (x + 1) * 600 * -1;
      otherCar.style.top = otherCar.y + "px";
      otherCar.style.left = Math.floor(Math.random() * 150) + "px";
      otherCar.style.backgroundColor = "black";
      otherCar.style.border = "solid 1px white";
      gameArea.appendChild(otherCar);
    }
  }
});
