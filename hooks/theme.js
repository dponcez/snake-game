import { debounce } from "../utils/debounce.js";
import { eventHandler } from "../modules/custom_functions.js";
import { selector } from "../modules/custom_functions.js";
import { selectorAll } from "../modules/custom_functions.js";

export const handleDarkMode = (dark, active, [dataset, body, info, border]) => {
  const htmlRefs = {
    toggleDarkMode: selector(`${dataset}`),
    main: selector(`${body}`),
    infoElement: selectorAll(`${info}`),
    board: selector(border)
  }

  const { toggleDarkMode, main, infoElement, board } = htmlRefs;

  eventHandler(toggleDarkMode, 'click', debounce(() => {
    main.classList.toggle(`${dark}`)
    toggleDarkMode.classList.toggle(`${active}`);
    board.classList.toggle(active)
    infoElement.forEach(info => info.classList.toggle(`${active}`));

    const storage = (key, value) => localStorage.setItem(key, value);

    main.classList.contains(`${dark}`) ?
      storage('theme', 'true') :
      storage('theme', 'false')
  }, 300));

  const darkMode = (key, value) => {
    const localTheme = localStorage.getItem(key);

    if(localTheme === value){
      main.classList.add(`${dark}`);
      toggleDarkMode.classList.add(`${active}`);
      infoElement.forEach(info => info.classList.add(`${active}`));
      board.classList.add(active)
    }else{
      main.classList.remove(`${dark}`);
      toggleDarkMode.classList.remove(`${active}`);
      infoElement.forEach(info => info.classList.remove(`${active}`));
      board.classList.add(active)
    }
  }

  darkMode('theme', 'true')
}