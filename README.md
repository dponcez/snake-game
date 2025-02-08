# Snake Game

> **NOTE!**: this is a simple arcade game where the player can control a snake's moves around the board to eat food.
> The goal about this, is to keep the snake eating food without crashing into the walls or obstacles. The game ends when the snake crashes.

## Development Environment
----

__Technologies__

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

__Source code editor__

- [VSCode](https://code.visualstudio.com)

__Tool__

- [GIT](https://git-scm.com)

### Project Structure
----

```
└── 📁snake-game
    └── 📁assets
        └── snake-preview.png
    └── 📁css
        └── main.css
    └── 📁js
        └── main.js
    └── 📁modules
        └── custom_functions.js
        └── snake_game.js
    └── 📁utils
        └── debounce.js
    └── .gitignore
    └── favicon.ico
    └── index.html
    └── LICENSE
    └── README.md
```

### ¿What is JSDoc?
----

[JSDoc](https://jsdoc.app) is a JavaScript documentation that uses tags to describe additional information about parameters and their return value, also a powerful tool for documenting JavaScript code.

Not only do they help other developers understand how to use your code, but they can also be used to generate automatic documentation.

Some of the advantages of using JSDoc tags are:

- Improves code readability.
- Makes the code easier to understand to other developers.
- Allows automatic documentation generation.
- Helps detect errors and inconsistencies in the code.
- Improve team collaboration.
<small style="font-size: .65rem">[META]</small>

Some of the most common JSDoc tags are: 

- @function
- @description
- @param
- @returns 

__Basic syntaxis:__

```js
  /**
   * 
   * Description of the function
   * @param { type } nameOfParam: description of parameter
  */

 function myFunction(nameOfParam){
  // code goes here
 }
```

__Explanation__

- __@function__: refers to a function and usually used in conjunction with the function name.
- __@description__: indicates detailed information about the functions, variables, classes or methods that are documented.
- __@param__: is a tag used in function and method documentation to be describe the parameters that are passed to functions.
- __{ type }__: specifies the data type of parameter, for example (string, number, object) etc.
- __@returns__ is a tag used to describe the return value of a function.
- __nameOfParam__: is the name of parameter.

__Example__

```js
  /**
   * 
   * @function sum
   * @description: calculate the sum of two numbers
   * @param { number } a: return the value of a
   * @param { number } b: return the value of b
   * @returns { number } return the sum of a and b
  */

  function sum(a, b){
    return a + b
  }
```

The following functions described below use JSDoc tags to discribe the purpose of each function and the parameters these function receive.

The JSDoc is not available in the examples below, but you can see them in the repository.

### Debounce
----

The ```debounce()``` function forces a function to wait a few times before running the execution and preventing from being called several times.

```js
  export function debounce(fn, wait){
    let timer;
    return (...args) => {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(context, args), wait);
    }
  }
```

### Code Explanation
-----

1. **Imported elements**

First of all, we need to import all the elements and functions that our snake game needs to work.

```js
import { selector } from "./custom_functions.js";
import { createElement } from "./custom_functions.js";
import { eventHandler } from "./custom_functions.js";
import { generateGameElement } from "./custom_functions.js";
import { debounce } from "../utils/debounce.js";
```

2. **Variables**

We will create global variables to use anywhere in the code.

```js
let snakeCoords = [{x: 10, y: 10}];
let direction = 'right';
let gameStarted = false;
let speedLimit = 200;
let scoreIndex = 0;
let interval;

const GRID_SIZE = 20;
```

**Explanation**

- **`let snakeCoords = [{x: 10, y: 10}]`**: an array called _snakeCoords_ is created, which stores the coordinates of each segment of the snake.

- **`let direction = 'right'`**: the initial direction of the snake is set to the _'right'_ position.

- **`let gameStarted = false`**: this variable indicates if the snake game has been started.

- **`let speedLimit = 200`**: determines the speed of the snake, a lower value means the game will be faster.

- **`let scoreIndex = 0`**: it will be used to store the player's score.

- **`let interaval`**: will be used to store the interval identifier, whice controls the duration of the snake's movements and its update.

- **```const GRID_SIZE = 20```**: this variable defines the dimensions of the grid size and also, to be able to limit the movement of the snake.

3. **Objects**

An _htmlRefs_ variable is created to store the references of the _HTML_ elements, which will be used in the game.

```js
const htmlRefs = {
  score: selector('[data-score]'),
  highScore: selector('[data-high-score]'),
  gameBoard: selector('[data-game-board]'),
  gameDescription: selector('[data-game-description]'),
  scoreContainer: selector('.score--container')
}
```

**Explanation**

- **`score: selector('[data-score]')`**: it's use to obtain _HTML_ references that have the _data-score_ attribute, which stores the player's score.

- **`highScore: selector('[data-high-score]')`**: it's use to obtain _HTML_ references that have the _data-high-score_ attribute, which stores the player's high score.

- **`gameBoard: selector('[data-game-board]')`**: it's use to obtain _HTML_ references that have the _data-game-board_ attribute, whice repesents of the board of the game.

- **`gameDescription: selector('[data-game-description]')`**: it's use to get _HTML_ references that have the _data-game-description_ attribute, which represents the game description.

- **`scoreContainer: selector('.score--container')`**: is used to get _HTML_ references that has the _.score--container_ class.

4. **Desctructuring**

Destructures the object, to assign the properties to individual variables with the same names, this makes it easier to access these elements in the rest of the code.

```js
const { score, highScore, gameBoard, gameDescription, scoreContainer } = htmlRefs
``` 

5. **Functions**

A function is a block of code that can be executed multiple times from different parts of a program, and that performs a specific task. Functions are fundamental in any programming language and are used to:

- _Organize the code_: divide the code into logical and reusable blocks.

- _Reuse code_: avoid code repetition and reduce complexity.

- _Abstrac logic_: hide the implementation of a task and show only its interface.

- _Improve readability_: make code easier to understand and maintain.

**initGame**

```js
export const initGame = () => {
  gameBoard.innerHTML = '';

  drawSnake();
  drawSnakeFood();
  drawSnakeBricks();
  updateScore()
}
```

**Explanation**

- **`export const initGame = () => {}`**: is the main function that can be exported and used in another module of the project.

- **`gameBoard.innerHTML = ''`**: delete all _HTML_ content from the element, to prepare the game board.

- **`drawSnake()`**: this function draws the snake on the board.

- **`drawSnakeFood()`**: this function draws the snake's food on the board.

- **`drawSnakeBricks()`**: this function draws obstacles on the board.

- **`updateScore()`**: this function updates the player's score.

**Update initGame function by adding Error Handling**

```js
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
```

1. **Catch specific errors**: instead of catching the general `Error`, catch specific errors that might occur during game initialization. For example, you could catch `TypeError` if a function is called with the wrong type of argument.

2. **Provide a default value**: if a function fails to execute, provide a default value to prevent the game from crashing. For example, you could set the score to _0_ if `updateScore()` fails.

3. **Log errors**: in addition to catching errors, log them to the console so you can diagnose issues later.

4. **Display an error message**: if an error occurs during game initialization, display an error message to the user to inform them of the issue.


**drawSnake**

```js
const drawSnake = () => {
  snakeCoords.forEach(segment => {
    const SNAKE = createSnakeElement('div', 'snake');
    snakePosition(SNAKE, segment);
    gameBoard.appendChild(SNAKE)
  })
}
```

**Explanation**

- **`const drawSnake = () => {}`**: this function was defined to draw the snake on the board.

- **`snakeCoords.forEach()`**: interate over an array called _snakeCoords_ that contains the coordinates of each segment of the snake.

- **`const SNAKE = createSnakeElement()`**: create a new _HTML_ element (a &lt;div&gt;) with the snake class to represent a segment of the snake.

- **`snakePosition()`**: place the snake segment in the correct position on the board. The _snakePosition_ function uses the segment coordinates to calculate the position.

- **`gameBoard.appendChild()`**: adds the snake segment to the _gameBoard_ element.

**drawSnakeFood**

```js
const drawSnakeFood = () => {
  if(gameStarted){
    const SNAKE_FOOD = createSnakeElement('div', 'food');
    snakePosition(SNAKE_FOOD, food);
    gameBoard.appendChild(SNAKE_FOOD)
  }
}
```

**Explanation**

- **`const drawSnakeFood = () => {}`**: defines a function to draw the food on the board.

- **`if(gameStarted){}`**: checks if the game has started before drawing the food.

- **`const SNAKE_FOOD = createSnakeElement()`**: creates a new _HTML_ element to represent the food.

- **`snakePosition()`**: place the food in the correct position on the board.

- **`gameBoard.appendChild()`**: adds the food to the _gameBoard_ element.

**drawSnakeBricks**

```js
const drawSnakeBricks = () => {
  const SNAKE_BRICK = createSnakeElement('div', 'brick');
  snakePosition(SNAKE_BRICK, brick);
  gameBoard.appendChild(SNAKE_BRICK)
}
```

**Explanation**

- **`const drawSnakeBricks = () => {}`**: this function will be executed every time we need to draw the bricks in the game.

- **`const SNAKE_BRICK = createSnakeElement()`**: this constant variable will store an _HTML_ element of type &lt;div&gt;.

- **`crateSnakeElement()`**: this function is resposible for creating this element and assigning it the 'brick' class. This class will be uses to apply specific _CSS_ styles to bricks.

- **`snakePosition()`**: this line places the brick in a specific position within the game board. This function is resposible for calculating the exact position of the brick based on the coordinates passed to it as an argument.

- **`gameBoard.appendChild()`**: this line adds the brick we just created to the _HTML_ element that represents the game board. This makes the brick visible on the screen.

**createSnakeElement**

```js
const createSnakeElement = (tag, name) => {
  const element = createElement(tag);
  element.className = name;
  return element;
}
```

**Explanation**

- **`createSnakeElement = () => {}`**: this function creates a new _HTML_ element of the type specified in the tag parameter (in this case, &lt;div&gt;).

- **`element.className = name`**: assigns the name class to the element so it can be styled with _CSS_.

- **`return element`**: returns the created element.

**snakePosition**

```js
const snakePosition = (element, position) => {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y
}
```

**Explanation**

- **`const snakePosition = () => {}`**: this function is resposable to place the exact position of the bricks based on the coordinates.

- **`element.style.gridColumn`**: place the brick in the _X-AXIS_ in the middle of the board.

- **`element.style.gridRow`**: place the brick in the _Y-AXIS_ in the middle of the board.

**generateElement**

```js
let food = generateGameElement(GRID_SIZE);
let brick = generateGameElement(GRID_SIZE);
```

**Explanation**

- **`generateGameElement()`**: this function generate random elements to make the _food_ or _brick_ variables, update their current position on the game board.

**snakeMovement**

```js
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
```

**Explanation**

- **`const snakeMovement = () => {}`**: the snakeMovement function updates the snake's position based on the current direction and handles collisions with food and bricks.

- **`const HEAD = { ...snakeCoords[0] }`**: it calculates the new head position of the snake by updating the HEAD object based on the current direction.

- **`{ ...snakeCoords[0] }`**: it adds the new head position to the beginning of the snakeCoords array.

- **`if(direction === 'left'){}`**: it checks if the _direction_ variable is equal to _'left'_, _'right'_, _'up'_ or _'down'_ strings, to increment or decrement the position of the snake.

- **`if(HEAD.x === food.x && HEAD.y === food.y){}`**: it checks if the snake has consumed the food by comparing the head position with the food's position. If so, it:

- **`food = generateGameElement()`**: regenerates the food and brick elements.

- **`incrementSpeedLimit()`**: increments the speed limit.

- **`clearInterval(interval)`**: resets the interval timer and restarts the game loop.

- **`snakeCoords.pop()`**: if the snake has not consumed the food, it removes the tail position from the snakeCoords array.

**startSnakeGame**

```js
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
```

**Explanation**

- **`const startSnakeGame = () => {}`**: this function initiate a game loop for a snake game. It sets the game to started state, hides the game description, and shows the score container.

- **`gameStarted`**: is set to true, indicating the game has begun.

- **`gameDescription.style.display = 'none'`**: the _gameDescription_ variable is set to 'hidden' (display: 'none'), to hide the game description when the snake game has started.

- **`scoreContainer.style.display = 'flex'`**: the _scoreContainer_ variable is set to 'flex' (display: 'flex'), to show the game's score when the game stars.

- **`clearInterval(interval)`**: resets the interval timer and restarts the game loop.

- **`interval = setInterval(() => {})`**: this function is called repeatedly at a specified interval (speedLimit).

**setSnakeDirection**

```js
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
```

**Explanation**

- **`const setSnakeDirection = (event) => {}`**: this function is the core of the direction handling. It takes a keyboard event as input.

- **`keyboardEvents`**: this array (currently with only one element) seems intended to map key names to arrow key codes. Direct comparison with event.code is simpler and more efficient.

- **`KEY`** and **`KEY_CODE`**: these variables store the pressed key's name (e.g., "ArrowLeft") and code (e.g., "ArrowLeft") _event.code_ is generally preferred over event.key for handling key presses in games because it's more consistent across different keyboard layouts.

- **`gameStarted`**: the _if_ condition checks if the game has started *(!gameStarted)* and if the pressed key is _Space_. If so, it sets _gameStarted_ to true and calls _startSnakeGame()_. This is the mechanism to initiate the game.

- Direction Setting: the _else_ block iterates through the _keyboardEvents_ array. Inside the loop, it checks if the pressed key matches any of the arrow key names. If a match is found, it updates the direction variable.

- **`handleKeyPress`**: this variable stores the debounced version of _setSnakeDirection_ function. Debouncing is used to prevent the snake from changing direction too rapidly when a key is held down. The debounce function likely uses a timer to limit the rate at which _setSnakeDirection_ is called. A 300ms delay is used.

- **`eventHandler`**: this function is a custom function that attaches the _handleKeyPress_ function as a listener for the keydown event on the document.

**incrementSpeedLimit**

```js
const incrementSpeedLimit = () => {
  if(speedLimit > 150) speedLimit -= 5;
  if(speedLimit > 100) speedLimit -= 3;
  if(speedLimit > 50) speedLimit -= 2;
}
```

**Explanation**

The **`const incrementSpeedLimit = () => {}`** function uses a series of _if_ statements to decrement speedLimit by different amounts depending on its current value.

**snakeCollision**

```js
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
```

**Explanation**

- **`const snakeCollision = () => {}`**: this function checks for two types of collisions in a Snake game: collisions with the game board boundaries and collisions with the snake's own body.

- **`HEAD`**: gets the coordinates of the snake's head from the snakeCoords array.

- **`X_AXIS_COLLISION`** and **`Y_AXIS_COLLISION`**: these boolean variables check if the head has gone beyond the boundaries of the game grid. It assumes the grid coordinates range from 1 to _GRID_SIZE_ inclusive.

- Boundary Collision: the _if_ statement checks if either _X_AXIS_COLLISION_ or _Y_AXIS_COLLISION_ is true. If so, it calls _resetSnakeGame()_.

- Self-Collision: the _for loop_ iterates through the snake's body (starting from the second element, index 1, as the head is at index 0).

- **`X_COORD`** and **`Y_COORD`**: these boolean variables check if the head's x and y coordinates match the coordinates of the current body segment.

- Self-Collision Check: the _if_ statement checks if both _X_COORD_ and _Y_COORD_ are true, meaning the head has collided with a body segment. If so, it calls _resetSnakeGame()_.

**snakeBrickCollision**

```js
const snakeBrickCollision = () => {
  const HEAD = { ...snakeCoords[0] };

  if(HEAD.x === brick.x && HEAD.y === brick.y){
    resetSnakeGame()
  }
}
```

**Explanation**

- **`const snakeBrickCollision = () => {}`**: this function checks if the snake's head has collided with a brick (obstacles) in your game.

- **`HEAD`**: creates a shallow copy of the snake's head coordinates. This is important because if you modified _snakeCoords[0]_ directly, it would affect the snake's actual position.

- Collision Check: checks if the head's _x_ and _y_ coordinates are equal to the brick's x and y coordinates.

- Game Over: if a collision occurs, it calls _resetSnakeGame()_.

**resetSnakeGame**

```js
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
```

**Explaation**

- **`const resetSnakeGame = () => {}`**: this function handles resetting the game state when the player collides with a wall, the snake's own body, or a brick.

- **`updateHighScore()`**: updates the high score.

- **`stopGame()`**: stops the game loop or timer.

- **`gameDescription.style.display = 'flex'`**: shows the game description (likely a "Game Over" message or instructions).

- **`setTimeout(...)`**: hides the score container after a 5-second delay. This might be to give the player a chance to see their final score before it's hidden.

- Reset Snake: resets the snake's coordinates to the initial position _[{ x: 10, y: 10 }]_.

- Reset Food: generates a new food item using _generateGameElement(GRID_SIZE)_.

- Reset Direction: sets the initial direction to _'right'_.

- Reset Speed: sets the speed limit back to the initial value of 200.

- **`updateScore()`**: updates the displayed score, likely resetting it to zero.

**resetGame**

```js
const stopGame = () => {
  gameStarted = false;
  clearInterval(interval);
}
```

**Explanation**

- **`const stopGame = () => {}`**: this function is a simple but crucial part of your game's logic. It's designed to halt the game loop and set the _gameStarted_ flag to false.

- **`gameStarted = false`**:  sets the gameStarted flag to false. This flag is likely used in your game loop or other game logic to determine whether the game is currently running. Setting it to false effectively pauses or stops the game.

- **`clearInterval(interval)`**: clears the interval associated with the game loop. The _interval_ variable returns the _setInterval_ when the game loop was started. _clearInterval_ stops the repeated execution of the game loop function.

**updateScore**

```js
const updateScore = () => {
  const currentScore = snakeCoords.length - 1;
  const STRING = currentScore.toString().padStart(3, '0');
  score.textContent = STRING
}
```

**Explanation**

- **`const updateScore = () => {}`**: this function calculates and updates the player's _score_ display in your Snake game.

- **`currentScore`**: calculates the current score by subtracting 1 from the length of the snakeCoords array. This assumes that the snake's length is one greater than the actual score (because the head is also part of the snakeCoords array).

- **`STRING`**: converts the _currentScore_ to a string and pads it with leading zeros to ensure it's always three digits long. This is done using _padStart(3, '0')_.

- **`score.textContent = STRING`**: updates the _textContent_ of the score element (an HTML element where the score is displayed) with the formatted score string.

**updateHighScore**

```js
const updateHighScore = () => {
  const currentScore = snakeCoords.length - 1;
  
  if(currentScore > scoreIndex){
    scoreIndex = currentScore;
    const STRING = currentScore.toString().padStart(3, '0');
    highScore.textContent = STRING
  }
}
```

**Explanation**

- **`const updateHighScore = () => {}`**: this function updates the displayed high score if the current score surpasses it.

- **`currentScore`**: calculates the current score (snake's length minus 1).

- High Score Check: checks if _currentScore_ is greater than _scoreIndex_ (which stores the current high score).

- Update High Score: if the current score is higher, it updates _scoreIndex_ with the new high score and formats the high score as a 3-digit padded string.

- Update Display: updates the highScore element's textContent with the formatted high score.

### License
-----

This project is distributed under the __MIT__ license. See the [LICENSE](./LICENSE) for more information

<p>&copy; 2024, Damian Ponce</p>