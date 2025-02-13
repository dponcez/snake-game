import { selector } from "./custom_functions.js";
import { createElement } from "./custom_functions.js";
import { eventHandler } from "./custom_functions.js";
import { generateGameElement } from "./custom_functions.js";
import { debounce } from "../utils/debounce.js";
import { log } from "./custom_functions.js";


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
  const keyboardEvents = [
    {
      left: "ArrowLeft",
      up: "ArrowUp",
      right: "ArrowRight",
      down: "ArrowDown",
    },
  ];

  const KEY = event.key;
  const KEY_CODE = event.code;

  if (!gameStarted && KEY_CODE === "Space") {
    gameStarted = true;
    
    startSnakeGame();
    return;
  } else {
    keyboardEvents.forEach((arrow) => {
      const { left, up, right, down } = arrow;

      if (KEY === left) direction = "left";
      if (KEY === up) direction = "up";
      if (KEY === right) direction = "right";
      if (KEY === down) direction = "down";
    });
  }
};

const handleKeyPress = debounce(setSnakeDirection, 100);
eventHandler(document, "keydown", handleKeyPress);

const incrementSpeedLimit = () => {
  const MIN_SPEED_LIMIT = 20;

  const decrements = [
    { threshold: 150, decrement: 5 },
    { threshold: 100, decrement: 3 },
    { threshold: 50, decrement: 1 },
  ];

  for (const { threshold, decrement } of decrements) {
    if (speedLimit > threshold) {
      speedLimit = Math.max(MIN_SPEED_LIMIT, speedLimit - decrement);
      return;
    }
  }

  speedLimit = Math.max(MIN_SPEED_LIMIT, speedLimit - 1);
};

const snakeCollision = () => {
  const HEAD = snakeCoords[0];

  const SNAKE_HIT_WALL =
    HEAD.x < 1 || HEAD.x > GRID_SIZE || HEAD.y < 1 || HEAD.y > GRID_SIZE;

  if (SNAKE_HIT_WALL) {
    resetSnakeGame();
    return;
  }

  for (let i = 1; i < snakeCoords.length; i++) {
    const SNAKE_COLLISION =
      HEAD.x === snakeCoords[i].x && HEAD.y === snakeCoords[i].y;

    if (SNAKE_COLLISION) {
      resetSnakeGame();
      return;
    }
  }
};

const snakeBrickCollision = () => {
  const HEAD = { ...snakeCoords[0] };
  const SNAKE_HIT_BRICK = HEAD.x === brick.x && HEAD.y === brick.y;

  if (SNAKE_HIT_BRICK) {
    resetSnakeGame();
    return;
  }
};

const resetSnakeGame = () => {
  updateHighScore();
  stopGame();

  gameDescription.style.display = 'flex';

  snakeCoords = [{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }];
  food = generateGameElement(GRID_SIZE);
  direction = "right";
  speedLimit = 200;
  score.textContent = 0;

  updateScore();
  gameStarted = false;
}

const stopGame = () => {
  gameStarted = false;
  clearInterval(interval);
  interval = null;
};

const updateScore = () => {
  const currentScore = snakeCoords.length - 1;
  const FORMATTED_SCORE = String(currentScore).padStart(3, '0');
  score.textContent = FORMATTED_SCORE
}

const updateHighScore = () => {
  const currentScore = snakeCoords.length - 1;

  if (currentScore > scoreIndex) {
    scoreIndex = currentScore;
    const FORMATTED_HIGH_SCORE = String(currentScore).padStart(3, '0');
    highScore.textContent = FORMATTED_HIGH_SCORE;

    // save high score to local storage
    localStorage.setItem('high-score', scoreIndex)
  }
};

// When the game loads, retrieve the high score from local storage:
window.addEventListener("DOMContentLoaded", () => {
  const STORED_HIGH_SCORE = localStorage.getItem("high-score");

  if (STORED_HIGH_SCORE) {
    try {
      const PARSED_SCORE = JSON.parse(STORED_HIGH_SCORE);
      if (isNaN(PARSED_SCORE)) {
        log(`Invalid score: ${PARSED_SCORE}`);
        return;
      }

      scoreIndex = parseInt(STORED_HIGH_SCORE, 10);
      highScore.textContent = String(scoreIndex).padStart(3, "0");
    } catch (error) {
      log(`Error parsing score: ${error}`);
    }
  }
});
