# DinoSar Game

## 🎮 What is DinoSar?

DinoSar is an endless runner game inspired by the iconic Chrome Dino game that appears when you're offline. It's a simple yet addictive game where you control a dinosaur character that must jump over obstacles to survive. This game demonstrates fundamental concepts of physics simulation, collision detection, and endless gameplay mechanics.

## 🎨 Game Design & Visual Elements

### Minimalist Design Philosophy
- **Clean Canvas**: Pure white background creates focus on gameplay
- **Simple Shapes**: Rectangular characters for easy recognition
- **Color Coding**: Red player vs Green obstacles for clear distinction
- **Large UI**: Oversized score display (100px font) for immediate feedback

### Visual Hierarchy
- **Player (Red)**: Stands out as the main character
- **Obstacles (Green)**: Clearly visible threats
- **Score Display**: Large, prominent for motivation
- **Game Over Message**: Bold red text for clear end state

## 🧠 JavaScript Learning Concepts

### 1. **Physics Simulation**
```javascript
let gravity = 1;
let isJumping = false;
let jumpVelocity = 0;

function updatePlayer() {
    if (isJumping) {
        player.y += jumpVelocity;
        jumpVelocity += gravity; // Apply gravity
    }
}
```
- **Gravity System**: Constant downward acceleration
- **Jump Mechanics**: Initial upward velocity that decreases over time
- **Physics Integration**: Realistic movement simulation

### 2. **State Management**
```javascript
let gameOver = false;
let score = 0;
let isJumping = false;
```
- **Boolean Flags**: Simple state tracking
- **Game States**: Running vs Game Over states
- **Player States**: Grounded vs Jumping states

### 3. **Collision Detection (AABB)**
```javascript
function checkCollision() {
    if (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y) {
        // Collision detected!
        gameOver = true;
    }
}
```
- **Axis-Aligned Bounding Box**: Most efficient collision detection
- **Rectangle Overlap**: Mathematical boundary checking
- **Performance**: Fast collision detection for real-time games

### 4. **Event Handling**
```javascript
window.addEventListener("keydown", playerJump);

function playerJump(event) {
    let keypressed = event.keyCode;
    if (keypressed === 32 && !isJumping && !gameOver) {
        isJumping = true;
        jumpVelocity = -20; // Jump strength
    }
}
```
- **Keyboard Input**: Spacebar detection (keyCode 32)
- **Conditional Logic**: Only jump when conditions are met
- **Event Prevention**: Avoid multiple jumps while in air

### 5. **Game Loop Architecture**
```javascript
function nextTick() {
    intervalID = setTimeout(() => {
        if (!gameOver) {
            clearBoard();
            updatePlayer();
            moveObstacle();
            checkCollision();
            drawPlayer();
            drawObstacle();
            nextTick(); // Recursive loop
        }
    }, 10); // 100 FPS
}
```
- **Recursive Game Loop**: Self-calling function for continuous updates
- **Conditional Execution**: Only run when game is active
- **High Frame Rate**: 10ms intervals for smooth animation

### 6. **Object Movement & Animation**
```javascript
function moveObstacle() {
    let speed = 3;
    obstacle.x -= speed; // Move left
    
    // Reset when off-screen
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = gameWidth;
        score += 1; // Increment score
    }
}
```
- **Continuous Movement**: Objects move every frame
- **Boundary Wrapping**: Reset position when off-screen
- **Score Integration**: Points awarded for survival

### 7. **Canvas Drawing**
```javascript
function drawPlayer() {
    ctx.fillStyle = playerColor;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacle() {
    ctx.fillStyle = obsColor;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}
```
- **Canvas API**: Drawing rectangles with fillRect()
- **Color Management**: Dynamic color assignment
- **Position-Based Drawing**: Objects drawn at their current positions

### 8. **Game Reset Logic**
```javascript
function resetGame() {
    obstacle.x = gameWidth; // Reset obstacle position
    player.y = gameHeight - player.height; // Reset player position
    score = 0;
    gameOver = false;
    nextTick(); // Restart game loop
}
```
- **State Reset**: All variables return to initial values
- **Position Reset**: Objects return to starting positions
- **Game Loop Restart**: Resume the main game loop

## 🎯 Game Mechanics Explained

### Jump Physics
- **Initial Velocity**: -20 pixels upward when spacebar pressed
- **Gravity Effect**: +1 pixel downward each frame
- **Landing Detection**: When player.y reaches ground level
- **Single Jump**: Cannot jump while already in air

### Obstacle System
- **Continuous Spawning**: Obstacles appear from right side
- **Constant Speed**: 3 pixels leftward per frame
- **Score Trigger**: Point awarded when obstacle leaves screen
- **Collision Boundary**: Precise rectangle overlap detection

### Game Flow
1. **Start**: Player on ground, obstacle approaching
2. **Jump**: Player presses spacebar, upward velocity applied
3. **Fall**: Gravity pulls player down
4. **Land**: Player returns to ground, can jump again
5. **Score**: Points awarded for each obstacle avoided
6. **Collision**: Game ends on contact with obstacle

## 🚀 Learning Outcomes

After studying this game, you'll understand:
1. **Physics Simulation**: Gravity and velocity in games
2. **Collision Detection**: AABB collision checking
3. **Game Loops**: Recursive animation loops
4. **State Management**: Boolean flags and game states
5. **Event Handling**: Keyboard input processing
6. **Canvas Drawing**: Basic 2D graphics
7. **Object Movement**: Continuous animation
8. **Game Reset**: Restarting game state

## 🎮 How to Play

- **Objective**: Jump over green obstacles to survive and score points
- **Controls**: Press **Spacebar** to jump
- **Scoring**: 1 point for each obstacle successfully avoided
- **Game Over**: Collision with any obstacle ends the game
- **Reset**: Use reset button to start a new game

## 🎨 Design Principles Demonstrated

### Simplicity
- **Minimal Graphics**: Focus on gameplay over visuals
- **Clear Objectives**: Simple goal (jump and survive)
- **Intuitive Controls**: Single key input

### Feedback
- **Immediate Response**: Jump happens instantly
- **Visual Score**: Large, clear score display
- **Game Over State**: Clear end condition

### Challenge
- **Timing-Based**: Requires precise timing
- **Increasing Difficulty**: Mental challenge increases with score
- **Endless Nature**: No maximum score limit

This DinoSar game is perfect for learning fundamental game development concepts while creating an engaging, addictive gameplay experience! 🦕🏃‍♂️
