# Snake Game

## 🎮 What is Snake?

Snake is one of the most iconic video games in history! Originally created in the 1970s, it became famous on Nokia phones in the 1990s. The game involves controlling a growing snake that moves around a grid, eating food to grow longer while avoiding walls and its own tail. This implementation demonstrates advanced JavaScript concepts including array manipulation, grid-based movement, and complex collision detection.

## 🎨 Game Design & Visual Elements

### Grid-Based Design
- **25x25 Pixel Grid**: Consistent unit-based movement system
- **Clean Aesthetics**: White background with green snake and red food
- **High Contrast**: Black borders on snake segments for clear visibility
- **Minimalist UI**: Simple score display and reset button

### Visual Hierarchy
- **Snake (Light Green)**: Main character with black borders
- **Food (Red)**: High contrast target for the snake
- **Grid System**: Invisible but mathematically precise positioning
- **Score Display**: Simple text showing current points

## 🧠 JavaScript Learning Concepts

### 1. **Array Manipulation & Data Structures**
```javascript
let snake = [{ x: gameWidth / 2, y: gameHeight / 2 }];

function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head); // Add new head
    
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        createFood();
    } else {
        snake.pop(); // Remove tail if no food eaten
    }
}
```
- **Array Methods**: unshift(), pop(), forEach()
- **Object Creation**: Creating coordinate objects
- **Dynamic Arrays**: Growing and shrinking arrays
- **Head/Tail Management**: Snake body as array of coordinates

### 2. **Grid-Based Movement System**
```javascript
const unitSize = 25;

function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
}
```
- **Grid Alignment**: All movement snaps to grid positions
- **Mathematical Positioning**: Calculating grid coordinates
- **Consistent Movement**: Snake moves exactly one unit per frame

### 3. **Direction Control & State Management**
```javascript
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    
    const goingUp = yVelocity == -unitSize;
    const goingDown = yVelocity == unitSize;
    const goingRight = xVelocity == unitSize;
    const goingLeft = xVelocity == -unitSize;
    
    switch (true) {
        case keyPressed == LEFT && !goingRight:
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        // ... other directions
    }
}
```
- **Velocity Vectors**: Separate X and Y movement components
- **Direction Prevention**: Cannot reverse into self
- **State Tracking**: Current direction awareness
- **Switch Statements**: Clean direction handling

### 4. **Collision Detection System**
```javascript
function checkGameOver() {
    // Wall collision
    if (snake[0].x < 0 || snake[0].x >= gameWidth ||
        snake[0].y < 0 || snake[0].y >= gameHeight) {
        running = false;
    }
    
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}
```
- **Multiple Collision Types**: Wall and self-collision
- **Coordinate Comparison**: Exact position matching
- **Loop-Based Detection**: Checking all body segments
- **Game State Control**: Setting running flag

### 5. **Food Spawning & Random Generation**
```javascript
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
}
```
- **Random Positioning**: Math.random() for food placement
- **Grid Alignment**: Ensuring food spawns on grid positions
- **Boundary Checking**: Food stays within game area
- **Nested Functions**: Helper function for random generation

### 6. **Game Loop Architecture**
```javascript
function gameLoop() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            gameLoop(); // Recursive loop
        }, 100); // 10 FPS
    } else {
        displayGameOver();
    }
}
```
- **Conditional Loop**: Only runs when game is active
- **Recursive Design**: Self-calling function
- **State-Based Execution**: Different behavior based on game state
- **Performance Control**: 100ms intervals for manageable speed

### 7. **Canvas Drawing & Rendering**
```javascript
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((snakePart) => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}
```
- **Array Iteration**: forEach() for drawing each segment
- **Canvas API**: fillRect() and strokeRect() for drawing
- **Consistent Sizing**: All elements use unitSize
- **Color Management**: Dynamic color assignment

### 8. **Game Reset & State Management**
```javascript
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
}
```
- **Complete Reset**: All variables return to initial state
- **Array Initialization**: Predefined snake starting position
- **State Restoration**: Game returns to starting conditions

## 🎯 Game Mechanics Explained

### Snake Growth System
- **Head Addition**: New head added to front of array
- **Tail Removal**: Tail removed unless food is eaten
- **Growth Logic**: Snake grows by keeping tail when eating food
- **Body Tracking**: Each segment is a coordinate object

### Movement Mechanics
- **Continuous Movement**: Snake moves every frame
- **Direction Changes**: Arrow keys change velocity vectors
- **Grid-Based**: All movement snaps to 25-pixel grid
- **No Reversing**: Cannot move directly opposite to current direction

### Collision System
- **Wall Detection**: Check if head is outside game boundaries
- **Self-Collision**: Check if head overlaps any body segment
- **Food Detection**: Check if head position matches food position
- **Game Over**: Stop game loop on any collision

## 🚀 Learning Outcomes

After studying this game, you'll understand:
1. **Array Manipulation**: Dynamic arrays and array methods
2. **Grid-Based Systems**: Coordinate-based game mechanics
3. **Collision Detection**: Multiple collision types
4. **State Management**: Game state and reset functionality
5. **Direction Control**: Velocity vectors and movement
6. **Random Generation**: Food spawning and positioning
7. **Game Loops**: Conditional and recursive loops
8. **Canvas Drawing**: Rendering arrays of objects

## 🎮 How to Play

- **Objective**: Control the snake to eat red food and grow as long as possible
- **Controls**: Use **Arrow Keys** to change direction
- **Scoring**: 1 point for each food consumed
- **Game Over**: Hits walls or its own body
- **Reset**: Use reset button to start a new game

## 🎨 Design Principles Demonstrated

### Simplicity
- **Minimal Graphics**: Focus on gameplay mechanics
- **Clear Rules**: Simple objective and controls
- **Intuitive Design**: Easy to understand and play

### Challenge
- **Growing Difficulty**: Snake gets longer, harder to avoid self
- **Spatial Awareness**: Requires planning and foresight
- **Timing**: Precise control needed for high scores

### Technical Excellence
- **Efficient Algorithms**: Fast collision detection
- **Clean Code**: Well-organized functions and variables
- **Scalable Design**: Easy to modify and extend

This Snake implementation is perfect for learning complex JavaScript concepts while creating an engaging, strategic gameplay experience! 🐍🍎
