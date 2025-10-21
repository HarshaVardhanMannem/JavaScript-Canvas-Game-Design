const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0,
};
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100,
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  createBall();
  nextTick();
}
function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function createBall() {
  ballSpeed = 1;
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
  drawBall(ballX, ballY);
}
function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}
function drawBall(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}
function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    player2Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    player1Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }
      break;
    case paddle1Down:
      if (paddle1.y < gameHeight - paddle1.height) {
        paddle1.y += paddleSpeed;
      }
      break;
    case paddle2Up:
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }
      break;
    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.height) {
        paddle2.y += paddleSpeed;
      }
      break;
  }
}
function updateScore() {
  scoreText.textContent = `${player1Score} : ${player2Score}`;
}
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
  };
  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
  };
  ballSpeed = 1;
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
}
/*

// ========================================
// CLASS: Paddle (Player bars on left/right)
// ========================================
class Paddle {
  constructor(x, y, width, height, color) {
    this.x = x;           // Horizontal position
    this.y = y;           // Vertical position
    this.width = width;   // Paddle width
    this.height = height; // Paddle height
    this.color = color;   // Paddle color
    this.speed = 50;      // Move speed
  }

  // Draw paddle on canvas
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  // Move paddle up
  moveUp() {
    if (this.y > 0) {
      this.y -= this.speed;
    }
  }

  // Move paddle down
  moveDown(gameHeight) {
    if (this.y < gameHeight - this.height) {
      this.y += this.speed;
    }
  }

  // Reset paddle to starting position
  reset(x, y) {
    this.x = x;
    this.y = y;
  }
}

// ========================================
// CLASS: Ball (Yellow circle that bounces)
// ========================================
class Ball {
  constructor(x, y, radius, color) {
    this.x = x;                 // Horizontal position
    this.y = y;                 // Vertical position
    this.radius = radius;       // Ball size
    this.color = color;         // Ball color
    this.speed = 1;             // Move speed
    this.xDirection = 0;        // -1 = left, 1 = right
    this.yDirection = 0;        // -1 = up, 1 = down
  }

  // Draw ball on canvas
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  // Start ball with random direction
  launch(gameWidth, gameHeight) {
    this.speed = 1;
    
    // Random left or right direction
    this.xDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    
    // Random up or down direction
    this.yDirection = Math.round(Math.random()) === 1 
      ? Math.random() 
      : Math.random() * -1;
    
    // Start from center
    this.x = gameWidth / 2;
    this.y = gameHeight / 2;
  }

  // Move ball based on speed and direction
  move() {
    this.x += this.speed * this.xDirection;
    this.y += this.speed * this.yDirection;
  }

  // Bounce ball when hit top or bottom wall
  bounceY() {
    this.yDirection *= -1;
  }

  // Bounce ball when hit paddle and increase speed
  bounceX() {
    this.xDirection *= -1;
    this.speed += 1;
  }

  // Check if ball went past left side (player 2 scores)
  isOutLeft() {
    return this.x <= 0;
  }

  // Check if ball went past right side (player 1 scores)
  isOutRight(gameWidth) {
    return this.x >= gameWidth;
  }
}

// ========================================
// CLASS: Game (Main game controller)
// ========================================
class PongGame {
  constructor() {
    // Get HTML elements
    this.canvas = document.querySelector("#gameBoard");
    this.ctx = this.canvas.getContext("2d");
    this.scoreText = document.querySelector("#scoreText");
    this.resetBtn = document.querySelector("#resetBtn");
    
    // Game dimensions
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    // Game colors
    this.bgColor = "forestgreen";
    
    // Create game objects
    this.paddle1 = new Paddle(0, 0, 25, 100, "lightblue");
    this.paddle2 = new Paddle(this.width - 25, this.height - 100, 25, 100, "red");
    this.ball = new Ball(this.width / 2, this.height / 2, 12.5, "yellow");
    
    // Game state
    this.player1Score = 0;
    this.player2Score = 0;
    this.intervalID = null;
    
    // Keyboard controls mapping
    this.keys = {
      W: 87,        // Paddle 1 up
      S: 83,        // Paddle 1 down
      UP: 38,       // Paddle 2 up
      DOWN: 40      // Paddle 2 down
    };
    
    // Setup event listeners
    this.setupControls();
    
    // Start game
    this.start();
  }

  // Setup keyboard and button controls
  setupControls() {
    window.addEventListener("keydown", (e) => this.handleKeyPress(e));
    this.resetBtn.addEventListener("click", () => this.reset());
  }

  // Handle keyboard input
  handleKeyPress(event) {
    const key = event.keyCode;
    
    switch (key) {
      case this.keys.W:
        this.paddle1.moveUp();
        break;
      case this.keys.S:
        this.paddle1.moveDown(this.height);
        break;
      case this.keys.UP:
        this.paddle2.moveUp();
        break;
      case this.keys.DOWN:
        this.paddle2.moveDown(this.height);
        break;
    }
  }

  // Start game
  start() {
    this.ball.launch(this.width, this.height);
    this.gameLoop();
  }

  // Main game loop (runs every 10ms)
  gameLoop() {
    this.intervalID = setTimeout(() => {
      this.clearCanvas();
      this.paddle1.draw(this.ctx);
      this.paddle2.draw(this.ctx);
      this.ball.move();
      this.ball.draw(this.ctx);
      this.checkCollisions();
      this.gameLoop();
    }, 10);
  }

  // Clear canvas with background color
  clearCanvas() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  // Check all collision types
  checkCollisions() {
    // Ball hit top wall
    if (this.ball.y <= 0 + this.ball.radius) {
      this.ball.bounceY();
    }
    
    // Ball hit bottom wall
    if (this.ball.y >= this.height - this.ball.radius) {
      this.ball.bounceY();
    }
    
    // Ball went past left side - Player 2 scores
    if (this.ball.isOutLeft()) {
      this.player2Score += 1;
      this.updateScore();
      this.ball.launch(this.width, this.height);
      return;
    }
    
    // Ball went past right side - Player 1 scores
    if (this.ball.isOutRight(this.width)) {
      this.player1Score += 1;
      this.updateScore();
      this.ball.launch(this.width, this.height);
      return;
    }
    
    // Ball hit paddle 1 (left paddle)
    if (this.ball.x <= this.paddle1.x + this.paddle1.width + this.ball.radius) {
      if (this.ball.y > this.paddle1.y && 
          this.ball.y < this.paddle1.y + this.paddle1.height) {
        // Prevent ball from getting stuck
        this.ball.x = this.paddle1.x + this.paddle1.width + this.ball.radius;
        this.ball.bounceX();
      }
    }
    
    // Ball hit paddle 2 (right paddle)
    if (this.ball.x >= this.paddle2.x - this.ball.radius) {
      if (this.ball.y > this.paddle2.y && 
          this.ball.y < this.paddle2.y + this.paddle2.height) {
        // Prevent ball from getting stuck
        this.ball.x = this.paddle2.x - this.ball.radius;
        this.ball.bounceX();
      }
    }
  }

  // Update score display
  updateScore() {
    this.scoreText.textContent = `${this.player1Score} : ${this.player2Score}`;
  }

  // Reset game to starting state
  reset() {
    // Reset scores
    this.player1Score = 0;
    this.player2Score = 0;
    
    // Reset paddles to starting positions
    this.paddle1.reset(0, 0);
    this.paddle2.reset(this.width - 25, this.height - 100);
    
    // Reset ball
    this.ball.speed = 1;
    this.ball.x = 0;
    this.ball.y = 0;
    this.ball.xDirection = 0;
    this.ball.yDirection = 0;
    
    // Update display
    this.updateScore();
    
    // Stop current game loop and restart
    clearInterval(this.intervalID);
    this.start();
  }
}

// ========================================
// START GAME
// ========================================
// Create new game when page loads
const game = new PongGame();


/* 
=======================================
SUMMARY - How OOP improves this code:
=======================================

1. ORGANIZATION:
   - Before: All code mixed together
   - After: Separated into logical classes

2. REUSABILITY:
   - Before: Copy-paste code for paddle1 and paddle2
   - After: One Paddle class used twice

3. MAINTENANCE:
   - Before: Hard to find and fix bugs
   - After: Each class handles its own logic

4. READABILITY:
   - Before: Long functions with many variables
   - After: Clear class structure with methods

5. CLASSES CREATED:
   - Paddle: Handles paddle movement and drawing
   - Ball: Handles ball movement and bouncing
   - PongGame: Controls the entire game

KEY OOP CONCEPTS USED:
- Encapsulation: Data and methods together in classes
- Abstraction: Hide complex details, show simple interface
- Reusability: Paddle class used for both players
*/
