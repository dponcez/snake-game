# Snake Game

> **NOTE!**: this is a simple arcade game where the player can control a snake's moves around the board to eat food.
> The goal about this, is to keep the snake eating food without crashing into the walls or obstacles. The game ends when the snake crashes.

## Development Environment
----

__Technologies__

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

__Souce code editor__

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

- **```let direction = 'right```**: the initial direction of the snake is set to the _'right'_ position.

- **```let gameStarted = false```**: this variable indicates if the snake game has been started.

- **```let speedLimit = 200```**: determines the speed of the snake, a lower value means the game will be faster.

- **```let scoreIndex = 0```**: it will be used to store the player's score.

- **```let interaval```**: will be used to store the interval identifier, whice controls the duration of the snake's movements and its update.

- **```const GRID_SIZE: 20```**: this variable defines the dimensions of the grid size and also, to be able to limit the movement of the snake.

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

- **```highScore: selector('[data-high-score]')```**: it's use to obtain _HTML_ references that have the _data--high-score_ attribute, which stores the player's high score.

- **```gameBoard: selector('[data-game-board]')```**: it's use to obtain _HTML_ references that have the _data-game-board_ attribute, whice repesents of the board of the game.

- **```gameDescription: selector('[data-game-description]')```**: it's use to get _HTML_ references that have the _data-game-description_ attribute, which represents the game description.

- **```scoreContainer: selector('.score-container')```**: is used to get _HTML_ references that has the _.score--container_ class.

4. **Desctructuring**

Destructures the object, to assign the properties to individual variables with the same names, this makes it easier to access these elements in the rest of the code.

```js
const { score, highScore, gameBoard, gameDescription, scoreContainer } = htmlRefs
``` 

### License
-----

This project is distributed under the __MIT__ license. See the [LICENSE](./LICENSE) for more information

<p>&copy; 2024, Damian Ponce</p>