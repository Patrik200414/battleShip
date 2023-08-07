import {selectGame, handleClick, resetGame, aiShoot} from './index.js';
import {data} from './data.js';

const CHAR_CODE_OF_A = 'A'.codePointAt(0);
const PLAYING_AREA_HEIGHT = 80;

function initGame() {
  document.querySelector('#reset').addEventListener('click', resetGame);
  document.querySelector('#aiShoot').addEventListener('click', () => {
    const boardSize = document.querySelectorAll(".container1 .cell").length;
    
    aiShoot({
      x: String.fromCharCode(Math.floor(
        (Math.random() * boardSize) + CHAR_CODE_OF_A,
      )),
      y: Math.floor((Math.random() * boardSize) + 1),
    });
  });
  for (const gameNumber in data) {
    document.getElementById('mode').insertAdjacentHTML('beforeend', `
      <option value=${data[gameNumber]}>${gameNumber}</option>
    `);
  }
  document.querySelector('.mode > select')
    .addEventListener('input', (e) => selectGame(e.target.value));
}

function handleClickHelper(event, x, y, clickType, source) {
  event.preventDefault();
  handleClick({
    x: String.fromCharCode(CHAR_CODE_OF_A + x),
    y: y + 1,
    clickType,
    source,
  });
}

export function displayBoard(boardStruct) {
  const grid = boardStruct.board;
  const containerElement = document.querySelector(`.container${boardStruct.boardNumber}`);
  console.log(containerElement);
  containerElement.innerHTML = '';
  containerElement.insertAdjacentHTML('afterbegin', creatHeadRow(grid.length));
  for (let x = 0; x < grid.length; x++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    rowElement.insertAdjacentHTML(
      'afterbegin',
      `<div class="head-cell" style='heigth: ${90 / (grid.length + 1)}vh; width: 3vh'>${String.fromCharCode(CHAR_CODE_OF_A + x)}</div>`,
    );
    for (let y = 0; y < grid[x].length; y++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.innerHTML = grid[x][y];
      cellElement.style.width = `${PLAYING_AREA_HEIGHT / (grid[x].length + 1)}vh`;
      cellElement.style.height = `${PLAYING_AREA_HEIGHT / (grid[x].length + 1)}vh`;
      cellElement.style.fontSize = `${(PLAYING_AREA_HEIGHT / (grid[x].length + 1)) - 5}vh`;
      cellElement.addEventListener('click', (event) => {
        handleClickHelper(event, x, y, 'left', boardStruct.boardNumber);
      });
      cellElement.addEventListener('contextmenu', (event) => {
        handleClickHelper(event, x, y, 'right', boardStruct.boardNumber);
      });
      rowElement.appendChild(cellElement);
    }
    containerElement.appendChild(rowElement);
  }
}

function creatHeadRow(length) {
  let result = `<div class='head-row'><div style='width: ${PLAYING_AREA_HEIGHT / (length + 1)}vh'></div>`;
  for (let i = 1; i <= length; i++) {
    console.log(length);
    result += `<div class="head-cell" style='width: ${PLAYING_AREA_HEIGHT / (length + 1)}vh'>${i}</div>`;
  }
  return `${result}</div>`;
}

function display(target, message, color) {
  const targetElement = document.getElementById(target);
  targetElement.style.color = color;
  targetElement.innerHTML = message;
}

export function displayMessage(...rest) {
  display('display', ...rest);
}

export function displayTextMessage(...rest) {
  display('textDisplay', ...rest);
}

window.addEventListener('load', () => {
  initGame();
});
