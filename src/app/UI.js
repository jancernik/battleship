import { getCoordsAttr, getElementByCoords } from './helpers';
import global from './global';

export default class UI {
  static createGameboard(id) {
    const board = document.getElementById(id);
    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
        const cell = document.createElement('div');
        cell.setAttribute('coords', `[${x}, ${y}]`);
        cell.classList.add('cell');
        board.appendChild(cell);
      }
    }
  }

  static renderPlayerShips(shipsCoords) {
    shipsCoords.forEach((ship) => {
      ship.forEach((coords) => {
        const target = getElementByCoords('player-board', coords);
        target.classList.add('ship');
        target.classList.remove('hover');
      });
    });
  }

  static animateComputerPlacement() {
    global.animationFinished = false;
    const computerBoard = document.getElementById('computer-board');
    computerBoard.setAttribute('data-state', 'PLACING SHIPS...');
    let i = 0;
    const interval = setInterval(() => {
      const ship = document.querySelector(`.computer[ship='${i}']`);
      ship.classList.add('placed');
      i += 1;
      if (i > 4) {
        clearInterval(interval);
        computerBoard.setAttribute('data-state', '');
        document.querySelector('.subtitle').innerText = 'Let the battle begin!';
        global.animationFinished = true;
      }
    }, 800);
  }

  static renderMarkers(ships) {
    const playerMarker = document.querySelector('.player-marker');
    const computerMarker = document.querySelector('.computer-marker');
    for (let h = 0; h < 2; h += 1) {
      for (let i = 0; i < ships.length; i += 1) {
        const ship = document.createElement('div');
        ship.classList.add('ship-marker');
        if (!h) ship.classList.add('player');
        else ship.classList.add('computer');
        for (let k = 0; k < ships[i]; k += 1) {
          const shipPiece = document.createElement('div');
          ship.setAttribute('ship', i);
          ship.appendChild(shipPiece);
        }
        if (h) computerMarker.appendChild(ship);
        else playerMarker.appendChild(ship);
      }
    }
  }

  static renderHoverEffect(cell, length, orientation, state) {
    if (!global.allShipsPlaced) {
      const cellCoords = getCoordsAttr(cell);
      if (orientation === 'x' && cellCoords[0] + length > 10) return;
      if (orientation === 'y' && cellCoords[1] + length > 10) return;
      for (let i = 0; i < length; i += 1) {
        let tempCoords;
        if (orientation === 'x')
          tempCoords = [cellCoords[0] + i, cellCoords[1]];
        else tempCoords = [cellCoords[0], cellCoords[1] + i];
        const sCoords = JSON.stringify(tempCoords).replaceAll(',', ', ');
        const targetCell = document.querySelector(`[coords='${sCoords}']`);
        if (state) targetCell.classList.add('hover');
        if (!state) targetCell.classList.remove('hover');
      }
    }
  }

  static removeHoverEffect() {
    document.querySelectorAll('.cell.hover').forEach((cell) => {
      cell.classList.remove('hover');
    });
  }

  static renderHit(target) {
    target.classList.add('hit');
  }

  static renderWater(target) {
    target.classList.add('water');
  }

  static selectMarker(target) {
    this.removeMarkerSelection();
    target.classList.add('selected');
  }

  static renderMarker(target) {
    const ship = document.querySelector(`.player[ship='${target}']`);
    ship.classList.add('placed');
  }

  static removeMarkerSelection() {
    document.querySelectorAll('.selected').forEach((marker) => {
      marker.classList.remove('selected');
    });
  }
}
