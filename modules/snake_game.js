import { selector } from "./custom_functions.js";
import { createElement } from "./custom_functions.js";
import { eventHandler } from "./custom_functions.js";
import { generateGameElement } from "./custom_functions.js";
import { debounce } from "../utils/debounce.js";


let snakeCoords = [{x: 10, y: 10}];
let direction = 'right';
let gameStarted = false;
let speedLimit = 200;
let scoreIndex = 0;
let interval;

const GRID_SIZE = 20;

const htmlRefs = {
  score: selector('[data-score]'),
  highScore: selector('[data-high-score]'),
  gameBoard: selector('[data-game-board]'),
  gameDescription: selector('[data-game-description]'),
  scoreContainer: selector('.score--container')
}

const { score, highScore, gameBoard, gameDescription, scoreContainer } = htmlRefs

export const initGame = () => {
  try {
    gameBoard.innerHTML = '';
  
    drawSnake();
    drawSnakeFood();
    drawSnakeBricks();
    const score = updateScore();

    if(typeof score !== 'number'){
      console.error(`Error updating score: ${score}`);
      score = 0;
    }
    
  } catch (error) {
    log(`Error initializing game: ${error}`);
    alert('Error initializing game. Please try again later!')
  }
}

const drawSnake = () => {
  snakeCoords.forEach(segment => {
    const SNAKE = createSnakeElement('div', 'snake');
    snakePosition(SNAKE, segment);
    gameBoard.appendChild(SNAKE)
  })
}

const drawSnakeFood = () => {
  if(gameStarted){
    const SNAKE_FOOD = createSnakeElement('div', 'food');
    snakePosition(SNAKE_FOOD, food);
    gameBoard.appendChild(SNAKE_FOOD)
  }
}

const drawSnakeBricks = () => {
  const SNAKE_BRICK = createSnakeElement('div', 'brick');
  snakePosition(SNAKE_BRICK, brick);
  gameBoard.appendChild(SNAKE_BRICK)
}

const createSnakeElement = (tag, name) => {
  const element = createElement(tag);
  element.className = name;
  return element;
}

const snakePosition = (element, position) => {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

let food = generateGameElement(GRID_SIZE);
let brick = generateGameElement(GRID_SIZE);

const snakeMovement = () => {
  const HEAD = { ...snakeCoords[0] };

  if(direction === 'left') HEAD.x--;
  if(direction === 'up') HEAD.y--;
  if(direction === 'right') HEAD.x++;
  if(direction === 'down') HEAD.y++;

  snakeCoords.unshift(HEAD);

  if(HEAD.x === food.x && HEAD.y === food.y){
    food = generateGameElement(GRID_SIZE);
    brick = generateGameElement(GRID_SIZE);
    incrementSpeedLimit();

    clearInterval(interval);
    interval = setInterval(() => {
      snakeMovement();
      snakeCollision();
      snakeBrickCollision();
      initGame()
    }, speedLimit)
  }else{
    snakeCoords.pop()
  }
}

const startSnakeGame = () => {
  gameStarted = true;
  gameDescription.style.display = 'none';
  scoreContainer.style.display = 'flex';

  clearInterval(interval);
  interval = setInterval(() => {
    snakeMovement();
    snakeCollision();
    snakeBrickCollision();
    initGame()
  }, speedLimit)
}

const setSnakeDirection = (event) => {
  const keyboardEvents = [{
    "left": "ArrowLeft",
    "up": "ArrowUp",
    "right": "ArrowRight",
    "down": "ArrowDown"
  }];

  const KEY = event.key;
  const KEY_CODE = event.code;

  if((!gameStarted && KEY_CODE === 'Space')){
    gameStarted = true;
    startSnakeGame()
  }else{
    keyboardEvents.forEach(arrow => {
      const { left, up, right, down } = arrow;

      if(KEY === left) direction = 'left';
      if(KEY === up) direction = 'up';
      if(KEY === right) direction = 'right';
      if(KEY === down) direction = 'down'
    })
  }
}

const handleKeyPress = debounce(setSnakeDirection, 300)
eventHandler(document, 'keydown', handleKeyPress)

const incrementSpeedLimit = () => {
  if(speedLimit > 150) speedLimit -= 5;
  if(speedLimit > 100) speedLimit -= 3;
  if(speedLimit > 50) speedLimit -= 2;
}

const snakeCollision = () => {
  const HEAD = snakeCoords[0];
  
  const X_AXIS_COLLISION = (HEAD.x < 1 || HEAD.x > GRID_SIZE);
  const Y_AXIS_COLLISION = (HEAD.y < 1 || HEAD.y > GRID_SIZE);

  if(X_AXIS_COLLISION || Y_AXIS_COLLISION){
    resetSnakeGame()
  }

  for(let i = 1; i < snakeCoords.length; i++){
    const X_COORD = HEAD.x === snakeCoords[i].x;
    const Y_COORD = HEAD.y === snakeCoords[i].y;

    if(X_COORD && Y_COORD){
      resetSnakeGame()
    }
  }
}

const snakeBrickCollision = () => {
  const HEAD = { ...snakeCoords[0] };

  if(HEAD.x === brick.x && HEAD.y === brick.y){
    resetSnakeGame()
  }
}

const resetSnakeGame = () => {
  updateHighScore();
  stopGame();

  gameDescription.style.display = 'flex';
  setTimeout(() => {
    scoreContainer.style.visibility = 'hidden';
  }, 5000);

  snakeCoords = [{ x: 10, y: 10 }];
  food = generateGameElement(GRID_SIZE);
  direction = 'right';
  speedLimit = 200;

  updateScore()
}

const stopGame = () => {
  gameStarted = false;
  clearInterval(interval);
}

const updateScore = () => {
  const currentScore = snakeCoords.length - 1;
  const STRING = currentScore.toString().padStart(3, '0');
  score.textContent = STRING
}

const updateHighScore = () => {
  const currentScore = snakeCoords.length - 1;

  if (currentScore > scoreIndex) {
    scoreIndex = currentScore;
    const STRING = currentScore.toString().padStart(3, "0");
    highScore.textContent = STRING;
  }
};