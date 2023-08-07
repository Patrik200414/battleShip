# battleShip
### Once You download:

At the terminal, run:
 `npm install` / `npm i`.
Start Live Server (Click on 'Go Live' at the bottom right corner.)

### Mandatory:

- 4x4 board
- minimum 2 1x1 ships
- they cannot be next to each other, at most diagonally
- the game has two phases
    - placement phase: in this phase you have to place the ships by clicking on the fields
    - shooting phase: n this phase we click to shoot at the ships in the other field

- AI shoot shoots at random places on our board, once the ships have sunk, it's game over
- game selection - found in data.js file here you can see where the AI ​​places the ships (function selectGame belongs to it)
- You have to set the AI ​​to see if it hit the ship
- Use as few global variables as possible
- you can communicate externally via message

### OPT:

- it must be adjusted so that larger ships can be placed on 5x5 fields
- left click: horizontal
- right click: vertical
- data must be validated
- Smart AI