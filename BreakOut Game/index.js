let canvas = document.querySelector("#gameBoard");
let ctx = canvas.getContext("2d");
let gameWidth = canvas.width;
let gameHeight = canvas.height;
let ballRadius = 12.5;
let brickwidth = 100;
let brickheight = 50;
let brickCount = 12;
let ballSpeed = 10;
let ballXDirection = 0;
let ballYDirection = 0;
let bricks = [];
let paddleSpeed = 50;

let brick = {
  width: 100,
  height: 50,
  x: 0,
  y: 0,
};

//console.log(gameWidth, gameHeight);
let paddle = {
  width: 80,
  height: 20,
  x: gameWidth - 80,
  y: gameHeight - 20,
};

let brickConfig = {
  rows: 5,
  cols: 8,
  width: 90,
  height: 30,
  padding: 10,
  offsetTop: 60,
  offsetLeft: 35,
};

let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballColor = "yellow";

gameStart();

function gameStart() {
  createBall();
  nextTick();
}
function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawpaddle();
    drawBrick(100);
    moveBall();
    drawball(ballX, ballY);
    checkCollision();
    nextTick();
  }, 20);
}

function clearBoard() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawpaddle() {
  ctx.fillStyle = "red";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0 + ballRadius) ballXDirection *= -1;
  if (ballX >= gameWidth - ballRadius) {
    ballXDirection *= -1;
  }
  if (ballY > gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY + ballRadius >= paddle.y) {
    if (ballX > paddle.x && ballX < paddle.x + paddle.width) {
      ballX = paddle.x - ballRadius;
      ballYDirection *= -1;
      ballSpeed += 1;
    }
  }
}

function drawball(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

function drawBrick(number) {
  // Draw the brick
  ctx.fillStyle = "forestgreen";
  ctx.fillRect(brick.x, brick.y, brick.width, brick.height);

  // Draw the number
  ctx.fillStyle = "white"; // text color
  ctx.font = "30px Arial"; // font size and style
  ctx.textAlign = "center"; // center horizontally
  ctx.textBaseline = "middle"; // center vertically

  // Position text in the middle of the brick
  ctx.fillText(number, brick.x + brick.width / 2, brick.y + brick.height / 2);
}
drawBrick(100);

window.addEventListener("keydown", movePaddle);

function movePaddle(event) {
  let keyPressed = event.keyCode;
  let leftkey = 37;
  let rightkey = 39;
  switch (keyPressed) {
    case leftkey: // Left Arrow
      paddle.x -= paddleSpeed;
      break;
    case rightkey: // Right Arrow
      paddle.x += paddleSpeed;
      break;
  }
  // Prevent paddle from going out of bounds
  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x + paddle.width > gameWidth) paddle.x = gameWidth - paddle.width;
}

function createBall() {
  ballSpeed = 2;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = Math.random() * 1; //more random directions
  } else {
    ballYDirection = Math.random() * -1; //more random directions
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawball(ballX, ballY);
}

function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}

/* 
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;

let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

let interval = 0;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
        }
      }
    }
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      if ((y -= paddleHeight)) {
        dy = -dy;
      }
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

function startGame() {
  interval = setInterval(draw, 10);
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
  startGame();
  runButton.disabled = true;
});
*/
