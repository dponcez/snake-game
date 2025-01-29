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

- **```let snakeCoords = [{x: 10, y: 10}]```**: an array called _snakeCoords_ is created, which stores the coordinates of each segment of the snake.

- **```let direction = 'right'```**: the initial direction of the snake is set to the _'right'_ position.

- **```let gameStarted = false```**: this variable indicates if the snake game has been started.

- **```let speedLimit = 200```**: determines the speed of the snake, a lower value means the game will be faster.

- **```let scoreIndex = 0```**: it will be used to store the player's score.

- **```let interaval```**: will be used to store the interval identifier, whice controls the duration of the snake's movements and its update.

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

- **```score: selector('[data-score]')```**: it's use to obtain _HTML_ references that have the _data-score_ attribute, which stores the player's score.

- **```highScore: selector('[data-high-score]')```**: it's use to obtain _HTML_ references that have the _data-high-score_ attribute, which stores the player's high score.

- **```gameBoard: selector('[data-game-board]')```**: it's use to obtain _HTML_ references that have the _data-game-board_ attribute, whice repesents of the board of the game.

- **```gameDescription: selector('[data-game-description]')```**: it's use to get _HTML_ references that have the _data-game-description_ attribute, which represents the game description.

- **```scoreContainer: selector('.score--container')```**: is used to get _HTML_ references that has the _.score--container_ class.

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

1. **initGame**

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

- **```export const initGame = () => {}```**: is the main function that can be exported and used in another module of the project.

- **```gameBoard.innerHTML = ''```**: delete all _HTML_ content from the element, to prepare the game board.

- **```drawSnake()```**: this function draws the snake on the board.

- **```drawSnakeFood()```**: this function draws the snake's food on the board.

- **```drawSnakeBricks()```**: this function draws obstacles on the board.

- **```updateScore()```**: this function updates the player's score.

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

- **```const drawSnake = () => {}```**: this function was defined to draw the snake on the board.

- **```snakeCoords.forEach()```**: interate over an array called _snakeCoords_ that contains the coordinates of each segment of the snake.

- **```const SNAKE = createSnakeElement()```**: create a new _HTML_ element (a &lt;div&gt;) with the snake class to represent a segment of the snake.

- **```snakePosition()```**: place the snake segment in the correct position on the board. The _snakePosition_ function uses the segment coordinates to calculate the position.

- **```gameBoard.appendChild()```**: adds the snake segment to the _gameBoard_ element.

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

- **```const drawSnakeFood = () => {}```**: defines a function to draw the food on the board.

- **```if(gameStarted){}```**: checks if the game has started before drawing the food.

- **```const SNAKE_FOOD = createSnakeElement()```**: creates a new _HTML_ element to represent the food.

- **```snakePosition()```**: place the food in the correct position on the board.

- **```gameBoard.appendChild()```**: adds the food to the _gameBoard_ element.

**drawSnakeBricks**

```js
const drawSnakeBricks = () => {
  const SNAKE_BRICK = createSnakeElement('div', 'brick');
  snakePosition(SNAKE_BRICK, brick);
  gameBoard.appendChild(SNAKE_BRICK)
}
```

**Explanation**

- **```const drawSnakeBricks = () => {}```**: this function will be executed every time we need to draw the bricks in the game.

- **```const SNAKE_BRICK = createSnakeElement()```**: this constant variable will store an _HTML_ element of type &lt;div&gt;.

- **```crateSnakeElement()```**: this function is resposible for creating this element and assigning it the 'brick' class. This class will be uses to apply specific _CSS_ styles to bricks.

- **```snakePosition()```**: this line places the brick in a specific position within the game board. This function is resposible for calculating the exact position of the brick based on the coordinates passed to it as an argument.

- **```gameBoard.appendChild()```**: this line adds the brick we just created to the _HTML_ element that represents the game board. This makes the brick visible on the screen.

**createSnakeElement**

```js
const createSnakeElement = (tag, name) => {
  const element = createElement(tag);
  element.className = name;
  return element;
}
```

**Explanation**

- **```createSnakeElement = () => {}```**: this function creates a new _HTML_ element of the type specified in the tag parameter (in this case, &lt;div&gt;).

- **```element.className = name```**: assigns the name class to the element so it can be styled with _CSS_.

- **```return element```**: returns the created element.

### License
-----

This project is distributed under the __MIT__ license. See the [LICENSE](./LICENSE) for more information

<p>&copy; 2024, Damian Ponce</p>