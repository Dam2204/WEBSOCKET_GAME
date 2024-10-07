import { gameStart, gameEnd } from './game.handler.js';
import { moveStageHandler } from './stage.handlers.js';
import { getItemHandler } from './item.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  11: moveStageHandler,
  12: getItemHandler,
};

export default handlerMappings;
