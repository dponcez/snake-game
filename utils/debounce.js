/**
 * Create a debounce function
 *
 * @function debounce
 * @description : returns a function that will not fire immediately if the user fires a handler event
 * @param { function } fn: function to invoked
 * @param { number } wait: time in "n" seconds or milliseconds to stop an execution
 * @returns { function } returns a debounced function
 * @example
 * const log = debounce(console.log, 500)
 * log("Hello") // will run after a 500 milliseconds
 */

export function debounce(fn, wait) {
  let timer;
  return (...args) => {
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), wait);
  };
}
