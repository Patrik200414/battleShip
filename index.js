import {displayBoard, displayMessage, displayTextMessage}
  from './event-handlers.js';

/**
 * This function is called when you choose the game mode.
 * The caller gives you the data about what kind of game
 * the AI would like to play and where it places its ships.
 * @param {String} gameDescription - An encoded string of the game data.
 *    You have to parse to use it.
 */

//Implementation of the selectGame function.

//Empty board
let state = {
  awaibleClicks: 0,
  boardSize: '',
  boardAi: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
  boardPlayer: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
  clickCount: 0,
  shipPositions: {
    s:{},
    p:{
      p1: []
    }
  }
};

//Validation - Can't place ship next to already existing ship on x, y
function isNextTo(xPos, yPos){
  
  let letters = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let xPosNum = letters.indexOf(xPos.toLowerCase());
  let yPosNum = yPos - 1;

  // console.log(xPosNum, yPosNum)
  if(isOccupide(xPosNum, yPosNum, state.boardPlayer)){
    let isNeighbersFree = true;
    for(let item of neighbors(xPosNum, yPosNum)){
      if(isOccupide(item[0], item[1], state.boardPlayer) === false){
        isNeighbersFree = false;
      }
    }
    return isNeighbersFree;
  } else{
    return false;
  }
}


function playerShoot(xPos, yPos){
  let letters = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let xPosNum = letters.indexOf(xPos.toLowerCase());
  let yPosNum = yPos - 1;

  console.log(xPosNum, yPosNum);
}

function converter(pos){
  let letters = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  return letters.indexOf(pos.toLowerCase());
}



function neighbors(xPosNum, yPosNum){
  let cordinateArr = [[xPosNum -1, yPosNum], [xPosNum, yPosNum + 1], [xPosNum + 1, yPosNum], [xPosNum, yPosNum - 1]];
  let rtn = [];
  for(let i = 0;i < cordinateArr.length; i++){
    if(!cordinateArr[i].includes(-1) && !cordinateArr[i].includes(state.boardSize)){
      rtn.push(cordinateArr[i]);
    }
  }
  return rtn;
}

//Validation - Is the step within the board?
function isOnBoard(xPos, yPos){
  let letters = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].splice(0, state.boardSize);
  let xPosNum = letters.indexOf(xPos.toLowerCase());
  let yPosNum = yPos;
  if(xPosNum !== -1 && yPosNum < state.boardSize){
    return [xPosNum, yPosNum];
  }
  
  /*
  if (xPosNum < state.boardPlayer.length - 1){
    return true
  }
  */
}


function isOccupide(xPosNum, yPosNum, board){
  if (board[xPosNum][yPosNum] === ''){
    return true;
  } else {
    setInterval(() => {
      displayTextMessage('This placement is already occupied!')
    }, 1000);
    displayTextMessage('message')
    return false;
  }
}

function reset (){
  /*
  boardSize: '',
  boardAi: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
  boardPlayer: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
  clickCount: 0,
  shipPositions: {
    s:{},
    p:{
      p1: []
    }
  }
  */;

  state.boardAi = boardGenerator(state.boardSize);
  state.boardPlayer = boardGenerator(state.boardSize);
  state.clickCount = 0;
  state.shipPositions = {
    s:{},
    p:{
      p1: []
    }
  };
}


//Implement the handleClick function
function definePlayerPosition(clickProperties){
  state.clickCount++;
  let clickInfoX = clickProperties.x.toLowerCase();
  let clickInfoY = clickProperties.y;
  let emptyArray = `${clickInfoX}${clickInfoY}`;
  state.shipPositions.p.p1.push(emptyArray);
  addShip(state.shipPositions.p, state.boardPlayer)
  displayBoard({boardNumber: 2, board: state.boardPlayer})
}

//Adding player steps to board
function addShip(shipPositions, board){
  let letters = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  state.boardAi = boardGenerator(state.boardSize);
  let modifyBoard = board;
  for(let ship in shipPositions){
    for(let i = 0; i < shipPositions[ship].length;i++){
      let row = letters.indexOf(shipPositions[ship][i][0]);
      let column = shipPositions[ship][i][1] - 1;
      modifyBoard[row][column] = ship;
    }
  }
  
  return modifyBoard;
}



function clickCountBasedOnAiShips(ships){
  let clickCount = 0;
  for(let ship in ships){
   clickCount += ships[ship].length;
  }
  return clickCount;
}


function boardGenerator(boardSize){
  let board = [];
  for(let i = 0;i<boardSize;i++){
    let boardIn = [];
    for(let j = 0;j<boardSize;j++){
      boardIn.push('');
    }
    board.push(boardIn);
  }
  return board;
}



// s:{s1:a1,s2:c4}

export function selectGame(gameDescription) {
  // You may delete the following line as an example to see what the data looks like.
  reset();
  state.boardSize = Number(gameDescription.split(',')[0].split(':')[1]);
  let playersCount = gameDescription.split('s:')[1];
  let other = playersCount.replaceAll('{', '');
  let otherOther = other.replaceAll('}', '');
  let ships = otherOther.split(',');

  for(let ship of ships){
    let shipName = ship.split(':')[0];
    let shipInfo = ship.split(':')[1];
    let arr = [];
    for(let i = 0;i<shipInfo.length;i++){
      if(i % 2 == 0){
        arr.push(`${shipInfo[i]}${shipInfo[i + 1]}`);
      }
    }
    state.shipPositions.s[shipName] = arr;
  }
  
  state.boardAi = boardGenerator(state.boardSize);
  state.boardPlayer = boardGenerator(state.boardSize);
  displayBoard({boardNumber: 1, board: state.boardAi});
  displayBoard({boardNumber: 2, board: state.boardPlayer});
  state.boardAi = addShip(state.shipPositions.s, state.boardAi);
  displayBoard({boardNumber: 1, board: state.boardAi});
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
    
  let canYouPutShip = isNextTo(clickProperties.x, clickProperties.y);
  state.awaibleClicks = clickCountBasedOnAiShips(state.shipPositions.s);

  if(clickProperties.source === 2 && state.clickCount < state.awaibleClicks && canYouPutShip){
    definePlayerPosition(clickProperties);
  } 
}

/**
 * Called when the player clicks on the reset game button.
 */
export function resetGame() {
  // You can delete the whole body of this function as an example.
  setInterval(() => displayTextMessage('text messege'), 2000);
  displayTextMessage('You have reset the board!')
  reset();
  displayBoard({boardNumber: 1, board: state.boardAi});
  displayBoard({boardNumber: 2, board: state.boardAi});
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
  let aiHits = isOnBoard(coordinates.x, coordinates.y);
  if(aiHits && state.boardPlayer[aiHits[0]][aiHits[1]] === 'p1'){
    state.boardPlayer[aiHits[0]][aiHits[1]] = 'X';
    displayBoard({boardNumber: 2, board: state.boardPlayer})
  }
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

