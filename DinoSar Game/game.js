const canvas = document.querySelector("#gameBoard");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;

const restbtn = document.querySelector("#resetBtn");
const scoreText = document.querySelector("#scoreText"); // ✅ UI element for score

let obsColor = "green";
let playerColor = "red";
let gravity = 1;
let isJumping = false;
let jumpVelocity = 0;
let score = 0;
let gameOver = false;
let intervalID;

let obstacle = {
  width: 30,
  height: 50,
  x: gameWidth - 50,
  y: gameHeight - 50,
};

let player = {
  width: 50,
  height: 60,
  x: 50,
  y: gameHeight - 60,
};

window.addEventListener("keydown", playerJump);
restbtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  score = 0;
  gameOver = false;
  ScoreUpdate();
  nextTick();
}

function nextTick() {
  intervalID = setTimeout(() => {
    if (!gameOver) {
      clearBoard();
      updatePlayer();
      moveObstacle();
      checkCollision();
      drawPlayer();
      drawObstacle();
      nextTick();
    }
  }, 10);
}

function clearBoard() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPlayer() {
  ctx.fillStyle = playerColor;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacle() {
  ctx.fillStyle = obsColor;
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function updatePlayer() {
  if (isJumping) {
    player.y += jumpVelocity;
    jumpVelocity += gravity;

    // stop when landing
    if (player.y >= gameHeight - player.height) {
      player.y = gameHeight - player.height;
      isJumping = false;
      jumpVelocity = 0;
    }
  }
}

function moveObstacle() {
  let speed = 3;
  obstacle.x -= speed;

  // reset when off-screen
  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = gameWidth;
    score += 1; // ✅ player survived = gain 1 point
    ScoreUpdate();
  }
}

function checkCollision() {
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  ) {
    console.log("💀 Game Over!");
    gameOver = true;
    clearTimeout(intervalID);
    drawGameOver();
  }
}

function playerJump(event) {
  let keypressed = event.keyCode;
  if (keypressed === 32 && !isJumping && !gameOver) {
    isJumping = true;
    jumpVelocity = -20; // Jump strength
  }
}

function ScoreUpdate() {
  scoreText.textContent = "Score: " + score;
}

function drawGameOver() {
  ctx.font = "40px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Game Over!", gameWidth / 2 - 100, gameHeight / 2);
}

function resetGame() {
  console.log("🔁 Resetting game...");
  obstacle.x = gameWidth;
  player.y = gameHeight - player.height;
  score = 0;
  gameOver = false;
  ScoreUpdate();
  nextTick();
}
