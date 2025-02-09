import { initGame } from "../modules/snake_game.js";
import { handleDarkMode } from "../hooks/theme.js";

handleDarkMode('dark', 'active', ['[data-dark-toggle]', 'body', '.inactive', '.game--board']);
initGame();
