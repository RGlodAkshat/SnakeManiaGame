// Game Constants & Variables
let inputDir = {x: 0, y: 0}; // Direction of the snake
const foodSound = new Audio('music/food.mp3'); // Sound when food is eaten
const gameOverSound = new Audio('music/gameover.mp3'); // Sound on game over
const moveSound = new Audio('music/move.mp3'); // Sound on movement
const musicsound = new Audio('music/music.mp3'); // Background music
const scoreElement = document.querySelector('.Score'); // Display for current score
const highScoreElement = document.querySelector('.highScore'); // Display for high score

let highestScore = 0; // Track the highest score
let speed = 7; // Game speed (frames per second)
let lastPaintTime = 0; // Time tracker for game updates
let score = 0; // Current score
let a = 2, b = 16; // Grid range for food and snake
let snakeArr = [
    {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
]; // Snake's starting position
let food = {
    x: Math.round(a + (b - a) * Math.random()), 
    y: Math.round(a + (b - a) * Math.random())
}; // Food's starting position

// Game Functions

// Main game loop
function main(ctime) {
    window.requestAnimationFrame(main); // Request the next frame
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return; // Control game speed
    lastPaintTime = ctime; // Update last painted time
    gameEngine(); // Call the game logic
}

// Start the game
function startGame() {
    window.requestAnimationFrame(main); // Begin the game loop
    musicsound.play(); // Play background music
}

// Check if snake has collided
function isCollide(sarr) {
    // Check if snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    // Check if snake bumps into the wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
    return false; // No collision
}

// Core game logic
function gameEngine() {
    // Part 1: Update snake and food positions
    if (isCollide(snakeArr)) {
        // Handle game over
        gameOverSound.play();
        musicsound.pause();
        inputDir = {x: 0, y: 0}; // Stop the snake
        alert("Game Over! Press any Arrow Key to start"); // Show game over alert
        score = 0; // Reset score
        scoreElement.textContent = 'Score: ' + score.toString(); // Update score display
        snakeArr = [{x: 13, y: 15}]; // Reset snake position
        musicsound.play(); // Restart background music
    }

    // Check if snake eats the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play(); // Play food sound
        score++; // Increase score
        scoreElement.textContent = 'Score: ' + score.toString(); // Update score display
        if (score > highestScore) {
            highestScore = score; // Update high score
            highScoreElement.textContent = 'High Score: ' + highestScore.toString(); // Update high score display
        }
        // Add new segment to snake
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        // Generate new food position
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    // Move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]}; // Shift segments forward
    }
    snakeArr[0].x += inputDir.x; // Update head position (X-axis)
    snakeArr[0].y += inputDir.y; // Update head position (Y-axis)

    // Part 2: Render snake and food on the board
    board.innerHTML = ""; // Clear the board

    // Display the snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if (index === 0) {
            snakeElement.classList.add('head'); // Add head class to the snake's head
        }
        board.appendChild(snakeElement); // Append the snake element to the board
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement); // Append the food element to the board
}

// Main logic starts here

// Event listener for key presses
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}; // Start the game
    moveSound.play(); // Play move sound
    // Update input direction based on key pressed
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
