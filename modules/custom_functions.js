export const selector = (element) => document.querySelector(element);
export const selectorAll = (element) => document.querySelectorAll(element);
export const createElement = (element) => document.createElement(element);
export const log = (value) => console.log(value);
export const generateGameElement = (size) => {
  const x = Math.floor(Math.random() * size) + 1;
  const y = Math.floor(Math.random() * size) + 1;

  return {x, y}
}
export const eventHandler = ($, event, callback) => $.addEventListener(event, callback);