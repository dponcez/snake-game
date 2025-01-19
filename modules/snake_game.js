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
  gameBoard.innerHTML = '';

  drawSnake();
  drawSnakeFood();
  drawSnakeBricks()
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

const snakeMovement = () => {}

const startSnakeGame = () => {
  gameStarted = true;
  gameDescription.style.display ='none';
  scoreContainer.style.display = 'flex';

  clearInterval(interval);
  interval = setInterval(() => {

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

  if((!gameStarted && event.code === "Space")){
    startSnakeGame()
  }else{
    keyboardEvents.forEach(arrow => {
      if(KEY === arrow.left) direction = "left";
      if(KEY === arrow.up) direction = "up";
      if(KEY === arrow.right) direction = "right";
      if(KEY === arrow.down) direction = "down"
    })
  }
}

// eventHandler(document, 'keydown', debounce((e) => setSnakeDirection(e)))
eventHandler(document, 'keydown', setSnakeDirection)

const incrementSpeedLimit = () => {}

const snakeCollision = () => {}

const snakeBrickCollision = () => {}

const resetSnakeGame = () => {}

const updateScore = () => {}

const updateHighScore = () => {}