document.addEventListener("DOMContentLoaded", function () {
  let body = document.body;

let wrapper = document.createElement("div");
wrapper.classList.add("wrapper");

let title = document.createElement("div");
title.classList.add("title");
title.innerHTML = "<strong>Minesweeper</strong>";
wrapper.appendChild(title);

const topBoard = document.createElement("div");
topBoard.classList.add("top-board");
wrapper.appendChild(topBoard);

const gameBoard = document.createElement("div");
gameBoard.classList.add("game-board");
wrapper.appendChild(gameBoard);

let clicker = document.createElement("div");
clicker.classList.add("clicker");

let clickerIcon = document.createElement("img");
clickerIcon.src = "assets/click.png";
clicker.appendChild(clickerIcon);

let clickerText = document.createElement("div");
clickerText.id = "clickerText";
clicker.appendChild(clickerText);

topBoard.appendChild(clicker);

let timer = document.createElement("div");
timer.id = "timer";

let timerIcon = document.createElement("img");
timerIcon.src = "assets/timer.png";
timer.appendChild(timerIcon);

let timerText = document.createElement("div");
timerText.id = "timerText";
timer.appendChild(timerText);

topBoard.appendChild(timer);

let result = document.createElement("div");
result.classList.add("result");
topBoard.appendChild(result);

let flagsLeft = document.createElement("div");
flagsLeft.id = "flags-left";

let flagsLeftIcon = document.createElement("img");
flagsLeftIcon.src = "assets/flag-new.png";
flagsLeft.appendChild(flagsLeftIcon);

let flagsLeftText = document.createElement("div");
flagsLeftText.id = "flags-left-text";
flagsLeft.appendChild(flagsLeftText);

topBoard.appendChild(flagsLeft);

let bombsLeft = document.createElement("div");
bombsLeft.id = "bombs-left";

let bombsLeftIcon = document.createElement("img");
bombsLeftIcon.src = "assets/bomb.png";
bombsLeft.appendChild(bombsLeftIcon);

let bombsLeftText = document.createElement("div");
bombsLeftText.id = "bombs-left-text";
bombsLeft.appendChild(bombsLeftText);

topBoard.appendChild(bombsLeft);

const bottomBoard = document.createElement("div");
bottomBoard.classList.add("bottom-board");
wrapper.appendChild(bottomBoard);

const easyButton = document.createElement("button");
easyButton.textContent = "Easy";
easyButton.classList.add("difficulty-button");
bottomBoard.appendChild(easyButton);

const mediumButton = document.createElement("button");
mediumButton.textContent = "Medium";
mediumButton.classList.add("difficulty-button");
bottomBoard.appendChild(mediumButton);

const hardButton = document.createElement("button");
hardButton.textContent = "Hard";
hardButton.classList.add("difficulty-button");
bottomBoard.appendChild(hardButton);

const bombInput = document.createElement("input");
bombInput.setAttribute("type", "number");
bombInput.setAttribute("min", "10");
bombInput.setAttribute("max", "99");
bombInput.classList.add("bomb-input");
bottomBoard.appendChild(bombInput);

const setBombsButton = document.createElement("button");
setBombsButton.textContent = "Update bombs";
setBombsButton.classList.add("set-bombs-button");
bottomBoard.appendChild(setBombsButton);

body.appendChild(wrapper);

let themeButton = document.createElement("div");

themeButton.classList.add("theme-icon");
themeButton.style.backgroundImage = "url(assets/eclipse.png)";
themeButton.style.width = "30px";
themeButton.style.height = "30px";
themeButton.style.margin = "20px";
themeButton.style.backgroundSize = "cover";
themeButton.style.cursor = "pointer";

document.body.appendChild(themeButton);

let settingsButton = document.createElement("div");

settingsButton.classList.add("settings-icon");
settingsButton.style.backgroundImage = "url(assets/settings.png)";
settingsButton.style.width = "30px";
settingsButton.style.height = "30px";
settingsButton.style.margin = "20px";
settingsButton.style.backgroundSize = "cover";
settingsButton.style.cursor = "pointer";

document.body.appendChild(settingsButton);

let width = 10;
let tiles = [];

let bombCount = 10; // Default bomb count
let flags = 0;
let isGameOver = false;
let count = 0;
// let intervalMarker = null;
let s = 0;
  let bombsPlaced = false
  let level = "easy";

// Define the dark/light mode toggle function
function toggleDarkLightMode() {
  const body = document.body;
  const elementsToToggle = [
    document.querySelector(".clicker"),
    document.querySelector("#timer"),
    document.querySelector("#flags-left"),
    document.querySelector("#bombs-left"),
    document.querySelector(".set-bombs-button"),
    ...document.querySelectorAll(".difficulty-button"),
    document.querySelector("input"),
  ];

  body.classList.toggle("dark-mode");

  // Toggle the background image based on the current mode
  const currentMode = body.classList.contains("dark-mode") ? "dark" : "light";
  const backgroundImage = `url(assets/${currentMode}.jpg)`;
  body.style.backgroundImage = backgroundImage;

  elementsToToggle.forEach((element) => {
    element.classList.toggle("dark-mode");
  });

  gameBoard.classList.toggle("dark");
}

themeButton.addEventListener("click", toggleDarkLightMode);

function toggleDarkLightMode() {
  const body = document.body;
  const elementsToToggle = [
    document.querySelector(".clicker"),
    document.querySelector("#timer"),
    document.querySelector("#flags-left"),
    document.querySelector("#bombs-left"),
    document.querySelector(".set-bombs-button"),
    ...document.querySelectorAll(".difficulty-button"),
    document.querySelector("input"),
  ];

  body.classList.toggle("dark-mode");

  const currentMode = body.classList.contains("dark-mode") ? "dark" : "light";
  const backgroundImage = `url(assets/${currentMode}.jpg)`;
  body.style.backgroundImage = backgroundImage;

  elementsToToggle.forEach((element) => {
    element.classList.toggle("dark-mode");
  });

  gameBoard.classList.toggle("dark");
}

themeButton.addEventListener("click", toggleDarkLightMode);

function setDifficulty(level) {
  // Clear out the old game board:
  while (gameBoard.firstChild) {
    gameBoard.firstChild.remove();
  }

  switch (level) {
    case "easy":
      width = 10;
      break;
    case "medium":
      width = 15;
      break;
    case "hard":
      width = 25;
      break;
    default:
      width = 10;
      //  defaultBombCount = 10;
      break;
  }

  let boardSize =
    width === 25 && window.innerWidth < 768 ? 20 * width : 30 * width; // Adjust board size based on condition

  // Clear previous game state
  isGameOver = false;
  gameBoard.innerHTML = "";
  tiles.length = 0;
  flags = 0;
  isGameOver = false;
  count = 0;
  s = 0;
  numClicks = 0;

  bombCount = parseInt(bombInput.value) || bombCount;
  bombInput.value = bombCount;

  document.getElementById("flags-left-text").textContent = `${bombCount}`;
  document.getElementById("timer").textContent = `0`;
  document.getElementById("clickerText").textContent = `0`;
  document.getElementById("bombs-left-text").textContent = `${bombCount}`;
  result.style.backgroundImage = "url(assets/face-2.svg)";
  resetTimer();
  startTime();
  // gameBoard.addEventListener("click");
  createBoard();
}
  
let resetTimer = () => {
  clearInterval(intervalMarker);
  count = 0;
  s = 0;
  document.getElementById("timer").textContent = s;
  intervalMarker = null; // important to allow the timer to start for the next game
};

// easyButton.addEventListener("click", () => setDifficulty("easy"));
// mediumButton.addEventListener("click", () => setDifficulty("medium"));
// hardButton.addEventListener("click", () => setDifficulty("hard"));
  
easyButton.addEventListener("click", () => {level = "easy"; setDifficulty(level);});
mediumButton.addEventListener("click", () => {level = "medium"; setDifficulty(level);});
hardButton.addEventListener("click", () => {level = "hard"; setDifficulty(level);});


  setBombsButton.addEventListener("click", updateGame);
  setBombsButton.addEventListener("click", () => setDifficulty(level));

function updateGame() {
  setDifficulty(width);
}

function createBoard() {
  const gameArray = Array(width * width).fill("valid");

  let tileSize = width === 25 && window.innerWidth < 768 ? 20 : 30; // Adjust tile size based on condition

  gameBoard.style.gridTemplateColumns = `repeat(${width}, ${tileSize}px)`;
  gameBoard.style.gridTemplateRows = `repeat(${width}, ${tileSize}px)`;

  for (let i = 0; i < width * width; i++) {
    let tile = document.createElement("div");
    tile.setAttribute("id", i);
    tile.classList.add("tile");
    tile.classList.add(gameArray[i]);
    gameBoard.appendChild(tile);
    tiles.push(tile);
    result.style.backgroundImage = "url(assets/face-2.svg)";
   
    tile.addEventListener("click", function (e) {
      
      if (!bombsPlaced) {
        placeBombs(tile.id);
        bombsPlaced = true;
        calculateNumbers();
      }

      click(tile);
    });

    let touchstart_time;
    let movedDuringTouch = false;

    tile.addEventListener("touchstart", function(e) {
      e.preventDefault();
      touchstart_time = new Date().getTime();
      movedDuringTouch = false;
    });

    tile.addEventListener("touchmove", function(e) {
      movedDuringTouch = true;
    });

    tile.addEventListener("touchend", function(e) {
      e.preventDefault();
      let touchend_time = new Date().getTime();
      if (!movedDuringTouch && touchend_time >= touchstart_time + 500) {
        addFlag(tile);
      } else if (!movedDuringTouch && touchend_time < touchstart_time + 500) {
        click(tile);
      }
    });

    tile.addEventListener("click", function(e) {
      click(tile);
    });

    tile.oncontextmenu = function(e) {
      e.preventDefault();
      addFlag(tile);
    };
  }
 }

// Add numbers
function calculateNumbers() {
  for (let i = 0; i < tiles.length; i++) {
    const isLeftEdge = i % width === 0;
    const isRightEdge = i % width === width - 1;
    let total = 0;

    if (tiles[i].classList.contains("valid")) {
      if (i > 0 && !isLeftEdge && tiles[i - 1].classList.contains("bomb"))
        total++;
      if (
        i >= width &&
        !isRightEdge &&
        tiles[i + 1 - width].classList.contains("bomb")
      )
        total++;
      if (i >= width && tiles[i - width].classList.contains("bomb")) total++;
      if (
        i >= width &&
        !isLeftEdge &&
        tiles[i - 1 - width].classList.contains("bomb")
      )
        total++;
      if (
        i < width * width - 1 &&
        !isRightEdge &&
        tiles[i + 1].classList.contains("bomb")
      )
        total++;
      if (
        i < width * (width - 1) &&
        !isLeftEdge &&
        tiles[i - 1 + width].classList.contains("bomb")
      )
        total++;
      if (
        i < width * (width - 1) &&
        !isRightEdge &&
        tiles[i + 1 + width].classList.contains("bomb")
      )
        total++;
      if (
        i < width * (width - 1) &&
        tiles[i + width].classList.contains("bomb")
      )
        total++;
      tiles[i].setAttribute("data", total);
    }
  }
  document.getElementById("bombs-left-text").textContent = `${bombCount}`;
}
createBoard();

function click(tile) {
  if (isGameOver) return;

  clickSound.play();

  let currentId = tile.id;
  if (
    isGameOver ||
    tile.classList.contains("checked") ||
    tile.classList.contains("flag")
  ) {
    return;
  }

  if (!tiles.some((tile) => tile.classList.contains("bomb"))) {
    placeBombs(currentId);
    calculateNumbers();
  }

  if (tile.classList.contains("bomb")) {
    gameOver(tile);

    return;
  }

  let total = tile.getAttribute("data");
  if (total != 0) {
    tile.classList.add("checked");
    tile.innerHTML = total;
    if (total == 1) tile.classList.add("one");
    if (total == 2) tile.classList.add("two");
    if (total == 3) tile.classList.add("three");
    if (total == 4) tile.classList.add("four");
    return;
  }

  checkTile(tile, currentId);
  tile.classList.add("checked");
}

function addFlag(tile, event) {
  if (isGameOver) return;

  if (
    !tile.classList.contains("checked") &&
    flags < bombCount &&
    !tile.classList.contains("flag")
  ) {
    tile.classList.add("flag");
    tile.innerHTML = " 🚩";
    flags++;
  } else if (tile.classList.contains("flag")) {
    tile.classList.remove("flag");
    tile.innerHTML = "";
    flags--;
  }

  document.getElementById("flags-left-text").textContent = `${bombCount -
    flags}`;

  let unmarked = unmarkedBombs();

  document.getElementById("bombs-left-text").textContent = `${unmarked}`;
  checkForWin();

  clickFlag.play();
}

function unmarkedBombs() {
  let count = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (
      tiles[i].classList.contains("bomb") &&
      !tiles[i].classList.contains("flag")
    ) {
      count++;
    }
  }
  return count;
}

function placeBombs(excludeId) {
  let bombPositions = [];

  while (bombPositions.length < bombCount) {
    let randomPosition = Math.floor(Math.random() * width * width);

    if (
      randomPosition != excludeId &&
      !bombPositions.includes(randomPosition)
    ) {
      bombPositions.push(randomPosition);
      tiles[randomPosition].classList.add("bomb");
      tiles[randomPosition].setAttribute("data", "bomb");
    }
  }
}

//check neighboring tiles when it is clicked
function checkTile(tile, currentId) {
  const isLeftEdge = currentId % width === 0;
  const isRightEdge = currentId % width === width - 1;

  setTimeout(() => {
    if (currentId > 0 && !isLeftEdge) {
      const newId = tiles[parseInt(currentId) - 1].id;
      const newTile = document.getElementById(newId);
      click(newTile);
    }
    if (currentId >= width && !isRightEdge) {
      const newId = tiles[parseInt(currentId) + 1 - width].id;
      const newTile = document.getElementById(newId);
      click(newTile);
    }
    if (currentId >= width) {
      const newId = tiles[parseInt(currentId) - width].id;
      const newTile = document.getElementById(newId);
      click(newTile);
    }
    if (currentId > width && !isLeftEdge) {
      const newId = tiles[parseInt(currentId) - 1 - width].id;
      const newTile = document.getElementById(newId);
      click(newTile);
    }
    if (currentId < width * width - 1 && !isRightEdge) {
      const newId = tiles[parseInt(currentId) + 1].id;
      const newTile = document.getElementById(newId);
      click(newTile);
    }
    if (currentId < (width - 1) * width && !isLeftEdge) {
      const newId = tiles[parseInt(currentId) - 1 + width].id;
      const newTile = document.getElementById(newId);
      click(newTile);
    }
    if (currentId < (width - 1) * width && !isRightEdge) {
      const newId = tiles[parseInt(currentId) + 1 + width].id;
      const newTile = document.getElementById(newId);
      click(newTile);
    }
    if (currentId < (width - 1) * width) {
      const newId = tiles[parseInt(currentId) + width].id;
      const newTile = document.getElementById(newId);
      click(newTile);
    }
  }, 10);
}

// Timer
let intervalMarker = null;

let startTime = () => {
  intervalMarker = setInterval(() => {
    count += 10;
    s = Math.floor(count / 1000);
    document.getElementById("timer").textContent = s;
  }, 10);
  gameBoard.removeEventListener("click", startTime);
};

gameBoard.addEventListener("click", startTime);

let numClicks = 0;

gameBoard.addEventListener("click", () => {
  numClicks++;
  document.getElementById("clickerText").textContent = `${numClicks}`;
});


//add sound effects
let clickSound = new Audio("assets/click.wav");
clickSound.muted = false;
let explosionSound = new Audio("assets/bomb.wav");
explosionSound.muted = false;
const clickFlag = new Audio("assets/dig.mp3");
clickFlag.muted = false;
const winSound = new Audio("assets/win.mp3");
winSound.muted = false;

let volumeButton = document.createElement("div");

volumeButton.classList.add("volume-icon");
volumeButton.style.backgroundImage = "url(assets/volume-on.svg)";
volumeButton.style.width = "30px";
volumeButton.style.height = "30px";
volumeButton.style.margin = "20px";
volumeButton.style.backgroundSize = "cover";
volumeButton.style.cursor = "pointer";

document.body.appendChild(volumeButton);

volumeButton.addEventListener("click", function() {
  if (
    clickSound.muted === false &&
    explosionSound.muted === false &&
    clickFlag.muted === false &&
    winSound.muted === false
  ) {
    clickSound.muted = true;
    explosionSound.muted = true;
    clickFlag.muted = true;
    volumeButton.style.backgroundImage =
      "url(assets/volume-muted-svgrepo-com.svg)";
  } else {
    clickSound.muted = false;
    explosionSound.muted = false;
    clickFlag.muted = false;
    winSound.muted = false;
    volumeButton.style.backgroundImage = "url(assets/volume-on.svg)";
  }
});

function gameOver(tile) {
  clearInterval(intervalMarker);

  result.style.backgroundImage = "url(assets/face-2-dead.svg)";
  timer.innerHTML = "End";
 

  explosionSound.play();

  isGameOver = true;

  // Show ALL the bombs
  tiles.forEach((tile) => {
    if (tile.classList.contains("bomb")) {
      tile.innerHTML = "💣";
      tile.classList.remove("bomb");
      tile.classList.add("checked");
    }
  });

  setTimeout(() => {
    const message = `Game over. Try again.`;
    alert(message);
  }, 500);
}

// Check for win
function checkForWin() {
  let matches = 0;

  for (let i = 0; i < tiles.length; i++) {
    if (
      tiles[i].classList.contains("flag") &&
      tiles[i].classList.contains("bomb")
    ) {
      matches++;
    }
  }

  if (matches === bombCount) {
    clearInterval(intervalMarker);
    result.style.backgroundImage = "url(assets/face-2-winner.svg)";
    winSound.play();
    timer.innerHTML = "WIN";
    isGameOver = true;
   

    setTimeout(() => {
      const message = `Hooray! You found all mines in ${s} seconds and ${numClicks} moves!`;
      alert(message);
    }, 500);
  }
}

result.addEventListener("click", function(e) {
  location.reload();
});

})