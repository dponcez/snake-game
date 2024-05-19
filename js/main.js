const initApp = () => {
  /*
    CUSTOM FUNCTIONS
      - element selector
      - create html element
      - event
  */
 const querySelector = (element) => document.querySelector(element);
 const createElement = (element) => document.createElement(element);
 const eventHandler = ($, event, callback) => $.addEventListener(event, callback);

  // global variables
  let snakeCoords = [{ x: 10, y: 10 }];
  let direction = 'right';
  let gameStarted = false;
  let speedLimit = 200;
  let scoreContent = 0;
  let interval;

  const GRID_SIZE = 20;

  const htmlRefs = {
    score: querySelector('[data-score]'),
    highScore: querySelector('[data-high-score]'),
    gameBoard: querySelector('[data-game-board]'),
    gameDescription: querySelector('[data-game-description]'),
    scoreContainer: querySelector('.score--container')
  }

  const {
    score,
    highScore,
    gameBoard,
    gameDescription,
    scoreContainer
  } = htmlRefs

  /*
    FUNCTIONS
      - init snake game
      - draw snake
      - draw snake food
      - create snake element
      - get snake position
      - generate random food
      - snake movement
      - change snake direction
      - increment speed limit
      - snake collision
      - start game
      - reset game
      - stop game
      - update score
      - update high score
  */

  const start = () => {
    gameBoard.innerHTML = '';
    drawSnake();
    drawSnakeFood();
    createSnakeBricks();
    updateScore()
  }

  const drawSnake = () => {
    snakeCoords.forEach(segment => {
      const snake = createSnakeElement('div', 'snake');
      setSnakePosition(snake, segment);
      gameBoard.appendChild(snake)
    })
  }

  const drawSnakeFood = () => {
    if(gameStarted){
      const snakeFood = createSnakeElement('div', 'food');
      setSnakePosition(snakeFood, food);
      gameBoard.appendChild(snakeFood);  
    }
  }

  const createSnakeBricks = () => {
    const snakeBrick = createSnakeElement('div', 'brick');
    setSnakePosition(snakeBrick, brick);
    gameBoard.appendChild(snakeBrick)
  }
  
  const setSnakePosition = (element, position) => {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
  }

  const createSnakeElement = (tag, name) => {
    const element = createElement(tag);
    element.className = name;
    return element
  }

  const generateRandomFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE) + 1;
    const y = Math.floor(Math.random() * GRID_SIZE) + 1;
    return { x, y }
  }

  const generateSnakeBrick = () => {
    const x = Math.floor(Math.random() * GRID_SIZE) + 1;
    const y = Math.floor(Math.random() * GRID_SIZE) + 1;
    return { x, y }     
  }

  let food = generateRandomFood();
  let brick = generateSnakeBrick()

  const snakeMovement = () => {
    const head = { ...snakeCoords[0] };
    
    if(direction === 'left') head.x--;
    if(direction === 'up') head.y--;
    if(direction === 'right') head.x++;
    if(direction === 'down') head.y++;

    snakeCoords.unshift(head);

    if(head.x === food.x && head.y === food.y){
      food = generateRandomFood();
      brick = generateSnakeBrick();
      incrementSpeedLimit();

      clearInterval(interval);
      interval = setInterval(() => {
        snakeMovement();
        snakeCollision();
        snakeBrickCollision();
        start();
      }, speedLimit)
    }else{
      snakeCoords.pop()
    }
  }

  const startGame = () => {
    gameStarted = true;
    gameDescription.style.display = 'none';
    scoreContainer.style.display = 'flex';

    clearInterval(interval);
    interval = setInterval(() => {
      snakeMovement();
      snakeCollision();
      snakeBrickCollision();
      start();
    }, speedLimit);
  }

  const setSnakeDirection = (event) => {
    const keyboardEvents = [{
      "left": "ArrowLeft",
      "up": "ArrowUp",
      "right": "ArrowRight",
      "down": "ArrowDown"
    }]

    const KEY = event.key;

    if((!gameStarted && event.code === 'Space')){
      startGame()
    }else{

      keyboardEvents.forEach(arrow => {
        if(KEY === arrow.left) direction = 'left';
        if(KEY === arrow.up) direction = 'up';
        if(KEY === arrow.right) direction = 'right';
        if(KEY === arrow.down) direction = 'down'
      })
    }
  }

  eventHandler(document, 'keydown', setSnakeDirection);

  const incrementSpeedLimit = () => {
    if(speedLimit > 150){
      speedLimit -= 5
    }
    if(speedLimit > 100){
      speedLimit -= 3
    }
    if(speedLimit > 50){
      speedLimit -= 2
    }
  }

  const snakeCollision = () => {
    const head = snakeCoords[0];

    const X_AXIS_COLLISION = (head.x < 1 || head.x > GRID_SIZE);
    const Y_AXIS_COLLISION = (head.y < 1 || head.y > GRID_SIZE);

    if(X_AXIS_COLLISION || Y_AXIS_COLLISION){
      resetGame()
    }

    for(let i = 1; i < snakeCoords.length; i++){
      const X_COORD = head.x === snakeCoords[i].x;
      const Y_COORD = head.y === snakeCoords[i].y;

      if(X_COORD && Y_COORD){
        resetGame()
      }
    }
  }

  const snakeBrickCollision = () => {
    const head = { ...snakeCoords[0] };

    if (head.x === brick.x && head.y === brick.y) {
      resetGame();
    }
  };

  const resetGame = () => {
    updateHighScore();
    stopGame();

    gameDescription.style.display = 'flex';
    setTimeout(() => {
      scoreContainer.style.display = 'none'
    }, 5000)

    snakeCoords = [{ x: 10, y: 10 }];
    food = generateRandomFood();
    direction = 'right';
    speedLimit = 200;

    updateScore();
  }

  const stopGame = () => {
    gameStarted = false;
    clearInterval(interval)
  }

  const updateScore = () => {
    const currentScore = snakeCoords.length - 1;
    const STRING = currentScore.toString().padStart(3, '0');
    score.textContent = STRING
  }

  const updateHighScore = () => {
    const currentScore = snakeCoords.length - 1;

    if(currentScore > scoreContent){
      scoreContent = currentScore;
      const STRING = currentScore.toString().padStart(3, '0');
      highScore.textContent = STRING
    }
  }
}

document.addEventListener('DOMContentLoaded', initApp)