import {displayBoard, displayMessage, displayTextMessage}
  from './event-handlers.js';

/**
 * This function is called when you choose the game mode.
 * The caller gives you the data about what kind of game
 * the AI would like to play and where it places its ships.
 * @param {String} gameDescription - An encoded string of the game data.
 *    You have to parse to use it.
 */

function boardGenerator(boardSize){
  let board = [];
  for(let i = 0;i<boardSize;i++){
    let boardIn = [];
    for(let j = 0;j<boardSize;j++){
      boardIn.push('');
    }
    board.push(boardIn);
  }
  displayBoard({boardNumber: 1, board: board});
  displayBoard({boardNumber: 2, board: board});
}



let state = {
  boardSize: '',
  shipPositions: {
    s: {},
    p: {}
  }
};


export function selectGame(gameDescription) {
  // You may delete the following line as an example to see what the data looks like.
  state.boardSize = Number(gameDescription.split(',')[0].split(':')[1]);
  let playersCount = gameDescription.split('s:')[1];
  let other = playersCount.replaceAll('{', '');
  let otherOther = other.replaceAll('}', '');
  let ships = otherOther.split(',');

  for(let ship of ships){
    let shipName = ship.split(':')[0];
    state.shipPositions.s[shipName] = [ship.split(':')[1]];
  }
  console.log(state);
  
  boardGenerator(state.boardSize);
  displayMessage(gameDescription, 'black');
}

/**
 * Called whenever the player clicks on a cell.
 * @param {Object} clickProperties - The clicked cell's properties.
 *    It contains x and y coordinates, clickType that can be 'left' or 'right',
 *    and source that indicates the number of the board where the click happened.
 */
export function handleClick(clickProperties) {
  // You may delete the following line as an example to see what the data looks like.
  displayMessage(clickProperties.x + clickProperties.y +
                 clickProperties.clickType + clickProperties.source);

  console.log(clickProperties);
}

/**
 * Called when the player clicks on the reset game button.
 */
export function resetGame() {
  // You can delete the whole body of this function as an example.
  boardGenerator(10);
}

/**
 * This function is called when the player clicks on the AI shoot button.
 * The caller gives you randomly generated coordinates.
 * You may ignore the parameter later when you implement more intelligent AI.
 * @param {Object} coordinates - Random generated coordinates (x and y),
 *    where the AI would like to shoot.
 */
export function aiShoot(coordinates) {
  // You may delete the following line as an example to see what the data looks like.
  displayMessage(coordinates.x + coordinates.y);
}


/*
Example to show how the three callable function looks in action.
The `displayBoard` function requires an object as an argument,
and it should have two properties:
`boardNumber` with 1 (left) or 2 (right) to decide where you would like to display,
and `board`, which should be a nested array to display.
`displayMessage` and `displayTextMessage` are functions to display messages:
They require two arguments: first is a string to display,
and the second is a color (can be text, RGB, RGBA, or hex color).
*/
displayBoard({ boardNumber: 1, board:
  [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
});
displayBoard({ boardNumber: 2, board:
  [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
});
displayMessage('message', 'green');
displayTextMessage('text message', 'red');
