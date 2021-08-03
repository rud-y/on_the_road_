document.addEventListener("DOMContentLoaded", function () {
  const score = document.querySelector(".score");
  const startScreen = document.querySelector(".start-screen");
  const gameArea = document.querySelector(".game-area");
  // player obj for holding speed, start --------
  let player = { speed: 4, turning: 3.5 };

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
      // console.log(line.y);
      if (line.y > 750) {
        line.y -= 750;
      }
      // !!!
      line.y += player.speed;
      line.style.top = line.y + "px";
    });
  }

  function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
      aRect.bottom < bRect.top ||
      aRect.top > bRect.bottom ||
      aRect.right < bRect.left ||
      aRect.left > bRect.right
    );
  }

  // Moving other cars downwards
  function moveOtherCar(car) {
    let element = document.querySelectorAll(".other-car");
    element.forEach((eachCar) => {
      // console.log(eachCar.y);
      if (isCollide(car, eachCar)) {
        console.log("BEEN HIT");
      }
      if (eachCar.y >= 1500) {
        eachCar.y -= 1500;
        eachCar.style.left = Math.floor(Math.random() * 200) + "px";
      }
      // !!!
      eachCar.y += player.speed;
      eachCar.style.top = eachCar.y + "px";
    });
  }

  // PLAY
  function playGame() {
    // console.log("...playing...");
    let car = document.querySelector(".car");
    moveLines();
    moveOtherCar(car);
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
    console.log("ON", e.key);
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
    car.innerText = "Jazz FJU";
    car.setAttribute("class", "car");
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    console.log("player: ", player);
    console.log("car: ", car);

    // Other cars added
    for (let x = 0; x < 4; x++) {
      let otherCar = document.createElement("div");
      otherCar.classList.add("other-car");
      //
      // otherCar.y = Math.floor(Math.random() * 500) * -1;
      otherCar.y = (x + 1) * 600 * -1;
      otherCar.style.top = otherCar.y + "px";
      otherCar.style.left = Math.floor(Math.random() * 250) + "px";
      otherCar.style.backgroundColor = "black";
      otherCar.style.border = "solid 1px white";
      gameArea.appendChild(otherCar);
      console.log("otherCar: " + otherCar);
    }
  }
});
